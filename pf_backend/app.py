from flask import Flask
from flask_cors import CORS 
from api.signup import signup_bp

app=Flask(__name__)
CORS(app)
app.register_blueprint(signup_bp,url_prefix='/api')

if __name__=='__main__':
    app.run(debug=True)