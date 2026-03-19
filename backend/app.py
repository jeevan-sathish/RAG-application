from flask import Flask,request,jsonify
from flask_cors import CORS
from db import get_connection


app=Flask(__name__)
CORS(app)

conn =get_connection()


if conn.is_connected():
    print("connected")



@app.route('/signin', methods=["POST"])
def signin_auth():
    cursor =conn.cursor()
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
    cursor =conn.cursor()
    user_data =request.get_json()
    name=user_data.get("name")
    gender =user_data.get("gender")
    status =user_data.get("status")
    email=user_data.get("email")
    password =user_data.get("password")
    
    if not all([name, gender, status, email, password]):
        return jsonify({"message": "Field error"}), 400
    else:
        try:
            query ="select name, email from users where email=%s"
            val=(email,)
            cursor.execute(query,val)
            rows =cursor.fetchone()
            if rows:
                return jsonify({
                    "message":"user exist"
                })
            else:
                query="INSERT INTO users(name,gender,status,email,password) VALUES(%s,%s,%s,%s,%s)"
                value =(name,gender,status,email,password)
                cursor.execute(query,value)
                conn.commit()
                cursor.close()
                return jsonify({
                    "message":"signup success"
                })
                
            
        except Exception as e:
            print("error:", e)
            
        
    
            

if __name__ == "__main__":
    app.run(debug=True)