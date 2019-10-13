from flask import Flask, render_template, request, redirect, session
from werkzeug.utils import secure_filename
import pymysql
import json
from time import time

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
    sql = 'select * from item'

    curs.execute(sql)

    data = curs.fetchall()

    return render_template('index.html', items=data)


@app.route('/item')
def item():
    if not session:
        return redirect('/')

    sql = 'select * from item where iid=%s'

    curs.execute(sql, request.args.get('iid'))

    data = curs.fetchone()

    return render_template('item.html', item=data)


@app.route('/register', methods=['POST','GET'])
def register():
    if request.method == 'GET':
        if not session:
            return redirect('/')
        return render_template('register.html')
    else:
        name = request.form['name']
        price = request.form['price']

        image = request.files['image']
        filename = str(int(time()))+secure_filename(image.filename)
        image.save('./static/image/'+filename)

        sql = 'insert into item (uid, name, price, address, image) values (%s,%s,%s,%s,%s)'
        curs.execute(sql, (session['uid'], name, price, session['address'], filename))
        conn.commit()

        return redirect('/')


@app.route('/signup', methods=['POST', 'GET'])
def signup():
    if request.method == 'GET':
        return render_template('signup.html')
    else:
        id = request.form['id']
        pw = request.form['pw']
        key = request.files['key']
        filename = str(int(time()))+secure_filename(key.filename)
        key.save('./static/keystore/'+filename)

        with open('./static/keystore/'+filename) as j:
            data = json.load(j)
            address = data['address']

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

    sql = 'select uid, address from user where id=%s'

    curs.execute(sql, id)

    data = curs.fetchone()

    address = data['address']
    uid = data['uid']

    session['address'] = address
    session['uid'] = uid

    return redirect('/')


@app.route('/logout')
def logout():
    session.pop('address')
    session.pop('uid')
    return redirect('/')





if __name__ == '__main__':
    app.run(host='0.0.0.0', debug='True')