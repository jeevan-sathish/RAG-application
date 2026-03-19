from db import get_connection

conn =get_connection()
cursor =conn.cursor()


print("connected succesfully")

query="INSERT INTO userAuth(email,password) values(%s,%s)"
val=("jeev@gmail.com","Jeev1234")
cursor.execute(query,val)
conn.commit()

print("insertted")

cursor.close()
conn.close()
