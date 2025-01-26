from flask import Blueprint,jsonify,request
import mysql.connector
from werkzeug.security import generate_password_hash


signup_bp=Blueprint('signup',__name__)
@signup_bp.route("/signup",methods=["POST"])
def signup():
    try:
        data=request.get_json()
        username=data.get('username')
        email=data.get('email')
        password=data.get('password')
        if not username or not email or not password:
            return jsonify({'error':'username,email and password are required'}),400
        
        conn=mysql.connector.connect(
            host='localhost',
            user='root',
            password='sainath',
            database='transactiondb'
            )
        print("connection established")
        hashed_password=generate_password_hash(password)
        print(hashed_password)
        cursor=conn.cursor(dictionary=True)
        print("cursor created") 
        x=cursor.execute("select *from users where email=%s",(email,))
        result=cursor.fetchone()
        if result:
            cursor.close()
            conn.close()
            return jsonify({'error':'email already exists'}),400
        query="INSERT INTO users(username,email,password) VALUES(%s,%s,%s)"
        cursor.execute(query,(username,email,password))
        print("query executed")    
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message':'signup successfull'}),201

    except mysql.connector.Error as err:
        print(f"MySQL error: {err}")
        return jsonify({'error': str(err)}), 500