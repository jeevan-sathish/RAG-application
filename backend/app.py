from flask import Flask,request,jsonify
from flask_cors import CORS
from db import get_connection

conn =get_connection()
cursor =conn.cursor()

if conn.is_connected():
    print("connected")

app=Flask(__name__)
CORS(app)

@app.route('/signin', methods=["POST"])
def signin_auth():
    user_data =request.get_json()
    email=user_data.get("email")
    password =user_data.get("password")
    
    if not email or not password:
        return jsonify({
            "message":"missing email or password"
        }), 404
    else:
        try:
            query ="select email ,password from userAuth where email=%s and password=%s"
            values=(email,password)
            cursor.execute(query,values)
            rows =cursor.fetchone()
            if rows:
                return jsonify({
                    "message":"login succesfull"
                })
            else:
                return jsonify(
                    {
                        "message":"user doent exist create an account"
                    }
                )
        except Exception as e:
            print("error",e)
        
        
        
    
            

if __name__ == "__main__":
    app.run(debug=True)