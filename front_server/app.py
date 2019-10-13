from flask import Flask, render_template, request, redirect, session
from werkzeug.utils import secure_filename
import pymysql
import json

app = Flask(__name__)
app.secret_key = 'Nharu7'

conn = pymysql.connect(
    host='45.76.216.162',
    port=3306,
    user='root',
    passwd='wogus4280',
    db='klaytn',
    charset='utf8'
)
curs = conn.cursor(pymysql.cursors.DictCursor)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/item')
def item():
    return render_template('item.html')


@app.route('/register')
def register():
    return render_template('register.html')


@app.route('/signup', methods=['POST', 'GET'])
def signup():
    if request.method == 'GET':
        return render_template('signup.html')
    else:
        id = request.form['id']
        pw = request.form['pw']
        key = request.files['key']
        key.save(secure_filename(key.filename))

        with open(secure_filename(key.filename)) as j:
            data = json.load(j)
            address =  data['address']

            sql = 'insert into user (id, password, address) values (%s, %s, %s)'

            curs.execute(sql, (id, pw, address))
            conn.commit()

            return redirect('/')


@app.route('/login', methods=['POST'])
def login():
    id = request.form['id']
    pw = request.form['pw']

    sql = 'select count(*) as c from user where id=%s and password=%s'

    curs.execute(sql, (id, pw))

    data = curs.fetchone()
    if data['c'] == 0:
        return redirect('/')

    sql = 'select address from user where id=%s'

    curs.execute(sql, id)

    data = curs.fetchone()

    address = data['address']

    session['address'] = address

    return redirect('/')


@app.route('/logout')
def logout():
    session.pop('address')
    return redirect('/')





if __name__ == '__main__':
    app.run(host='0.0.0.0')