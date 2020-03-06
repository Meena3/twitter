from flask import Flask
from flask import request,make_response,jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
import jwt 
import os
import json
import hashlib
import datetime

app = Flask(__name__,static_url_path="/static")
CORS(app)

app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = "Meena@sql@123"
app.config["MYSQL_DB"] = "twitter"
app.config["MYSQL_CURSOR"] = "DictCursor"
mysql=MySQL(app)

def md5_hash(string):
    hash = hashlib.md5()
    hash.update(string.encode('utf-8'))
    return hash.hexdigest()

def generate_salt():
    salt = os.urandom(16)
    return salt.hex()

@app.route('/register',methods = ['POST'])
def register():
    flag = False
    name = request.json["name"]
    email = request.json["email"]
    password = request.json["password"]
    profile_image = request.json["profile_image"]
    salt = generate_salt()
    password_hash = md5_hash(str(password) + str(salt))
    cursor = mysql.connection.cursor()
    cursor.execute(
        """insert into users(name,email,salt,password_hash,profile_image) values(%s,%s,%s,%s,%s)""",[name,email,salt,password_hash,profile_image]
    )
    mysql.connection.commit()
    cursor.close()
    return {"message":"success"}

# login
@app.route('/login',methods = ['POST'])
def login_user():
    check = False
    email = request.json["email"]
    password = request.json["password"]
    cursor = mysql.connection.cursor()
    cursor.execute("""select * from users""")
    result = cursor.fetchall()
    cursor.close()
    # print(result)
    items = []
    for item in result:
        items.append(item)
    cursor.close()
    for i in range(len(items)):
        # print(items)
        encoded_jwt=jwt.encode(
            {"id":items[i][0], "name": items[i][1]},'secretkey',algorithm='HS256').decode("utf-8")
            # print(encoded_jwt)
        return json.dumps(encoded_jwt)

# get token of user
@app.route('/get-token-user')
def getTokenUser():
    auth_header = request.headers.get('Authorization')
    token_encoded = auth_header.split(" ")[1]
    decode_token = jwt.decode(token_encoded,'secretkey',algorithms = ['HS256'])
    return json.dumps(decode_token)

# tweet add
@app.route('/tweet-add',methods = ['POST'])
def tweetAdd():
    user_id = int(request.json["user_id"])
    content = request.json["content"]
    cursor = mysql.connection.cursor()
    cursor.execute(
        """insert into tweet(user_id,content) values(%s,%s)""",[user_id,content]
    )
    mysql.connection.commit()
    cursor.close()
    return {"message":"success"}

# get user profile
@app.route('/user-profile',methods = ['POST'])
def userProfile():
    user_id = request.json["user_id"]
    cursor = mysql.connection.cursor()
    cursor.execute("select profile_image from users where user_id = (%s)",[user_id])
    result1 = cursor.fetchall() 
    return json.dumps(result1)
    

@app.route('/user-profile-tweet',methods = ['POST'])
def userProfileTweet():
    user_id = request.json["user_id"]
    cursor = mysql.connection.cursor()
    cursor.execute(""" select content from tweet where user_id = (%s)""",[user_id]
        # """ select (users.profile_image),(tweet.content) from users join tweet on tweet.user_id=(%s) and users.user_id=(%s)""",[user_id,user_id]
        # "select content from tweet where user_id = (%s)",[user_id]
    )
    results = cursor.fetchall()
    cursor.close()
    items = []
    for item in results:
        items.append(item)
    return json.dumps(items)

@app.route('/edit-profile',methods = ['POST'])
def editProfile():
    user_id = request.json["user_id"]
    profile_image = request.json["profile_image"]
    cursor = mysql.connection.cursor()
    cursor.execute(
        """ update users set profile_image = (%s) where user_id = (%s)""",[user_id,profile_image]
    )
    mysql.connection.commit()
    cursor.close()
    return json.dumps(profile_image)

# see all users
@app.route('/all-users',methods = ['GET'])
def allUsers():
    cursor = mysql.connection.cursor()
    cursor.execute(""" select (users.name), (users.profile_image),(tweet.content) from users  join tweet on tweet.user_id=users.user_id order by users.name""")
    results = cursor.fetchall()
    cursor.close()
    return json.dumps(results)

# all tweets
@app.route('/all-tweets',methods = ['GET'])
def allTweets():
    cursor = mysql.connection.cursor()
    cursor.execute("""select name from users""")
    results = cursor.fetchall()
    cursor.close()
    items = []
    for item in results:
        items.append(item)
    return json.dumps(items)

@app.route('/follow-user/<user_id>',methods = ['POST'])
def followUser():
    user_id = request.json["user_id"]
    follow = True
    cursor = mysql.connection.cursor()
    cursor.execute("""update users set follow = (%s) where user_id = (%s)""",[follow,user_id])
    mysql.connection.commit()
    cursor.close()
    return {"message":"Success"}

@app.route('/show-all-users')
def showAllUsers():
    page = request.args.get("page" ,default = 1,type = int)
    return pagination(page)


if __name__ == "main":
   app.run(debug=True)