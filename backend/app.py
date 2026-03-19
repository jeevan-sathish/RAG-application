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
            query ="select email ,password from users where email=%s and password=%s"
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
                        "message":"login failed"
                    }
                )
        except Exception as e:
            print("error",e)
        
@app.route('/signup',methods=["POST"])    
def get_signUP():
    user_data =request.get_json()
    name=user_data.get("name")
    gender =user_data.get("gender")
    status =user_data.get("status")
    email=user_data.get("email")
    password =user_data.get("password")
    
    if not all([name, gender, status, email, password]):
        return jsonify({"message": "Field error"}), 400
    else:
        return jsonify({
            "message":"field good"
        })
        
    
            

if __name__ == "__main__":
    app.run(debug=True)