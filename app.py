from flask import Flask, render_template, request, redirect, jsonify, send_from_directory
import sqlite3
from datetime import datetime
import os

app = Flask(__name__)
DB = os.path.join(os.path.dirname(__file__), 'b2b_health_app.db')

def init_db():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("""CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT, role TEXT)""")
    c.execute("""CREATE TABLE IF NOT EXISTS pharmacies(
        id INTEGER PRIMARY KEY, name TEXT, owner TEXT, phone TEXT, address TEXT)""")
    c.execute("""CREATE TABLE IF NOT EXISTS orders(
        id INTEGER PRIMARY KEY, user_id INTEGER, pharmacy_id INTEGER, medicine TEXT, quantity INTEGER, status TEXT DEFAULT 'Pending')""")
    c.execute("""CREATE TABLE IF NOT EXISTS webinars(
        id INTEGER PRIMARY KEY, title TEXT, description TEXT, video_url TEXT, uploaded_by TEXT, upload_date TEXT)""")
    c.execute("""CREATE TABLE IF NOT EXISTS learning_classes(
        id INTEGER PRIMARY KEY, title TEXT, description TEXT, meeting_link TEXT, date TEXT, time TEXT, uploaded_by TEXT)""")
    c.execute("""CREATE TABLE IF NOT EXISTS hygiene(
        id INTEGER PRIMARY KEY, gender TEXT, session TEXT)""")
    conn.commit()
    conn.close()

init_db()

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/user')
def user_dashboard():
    return render_template('user_dashboard.html')


@app.route('/login')
def login_page():
    return render_template('login.html')


@app.route('/login.html')
def login_html_fallback():
    return redirect('/login')

@app.route('/vendor')
def vendor_dashboard():
    return render_template('vendor_dashboard.html')

@app.route('/admin')
def admin_dashboard():
    return render_template('admin_dashboard.html')

@app.route('/api/orders/<int:user_id>')
def api_orders(user_id):
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("SELECT * FROM orders WHERE user_id=?", (user_id,))
    rows = c.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/api/place_order', methods=['POST'])
def api_place_order():
    data = request.form or request.json
    user_id = int(data.get('user_id', 1))
    pharmacy_id = int(data.get('pharmacy_id', 1))
    medicine = data.get('medicine','DemoMed')
    quantity = int(data.get('quantity',1))
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("INSERT INTO orders (user_id, pharmacy_id, medicine, quantity, status) VALUES (?,?,?,?,?)",
              (user_id, pharmacy_id, medicine, quantity, "Pending"))
    conn.commit()
    conn.close()
    return redirect('/user')

@app.route('/api/update_order', methods=['POST'])
def api_update_order():
    order_id = int(request.form.get('order_id'))
    status = request.form.get('status','Preparing')
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("UPDATE orders SET status=? WHERE id=?", (status, order_id))
    conn.commit()
    conn.close()
    return redirect(request.referrer or '/vendor')

@app.route('/webinars')
def view_webinars():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("SELECT * FROM webinars ORDER BY upload_date DESC")
    rows = c.fetchall()
    conn.close()
    return render_template('view_webinars.html', webinars=rows)

@app.route('/upload_webinar', methods=['GET','POST'])
def upload_webinar():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        video_url = request.form['video_url']
        uploaded_by = request.form['uploaded_by']
        conn = sqlite3.connect(DB)
        c = conn.cursor()
        c.execute("INSERT INTO webinars (title,description,video_url,uploaded_by,upload_date) VALUES (?,?,?,?,?)",
                  (title, description, video_url, uploaded_by, datetime.now().strftime('%Y-%m-%d')))
        conn.commit()
        conn.close()
        return redirect('/webinars')
    return render_template('upload_webinar.html')

@app.route('/classes')
def view_classes():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("SELECT * FROM learning_classes ORDER BY date, time")
    rows = c.fetchall()
    conn.close()
    return render_template('view_classes.html', classes=rows)

@app.route('/upload_class', methods=['GET','POST'])
def upload_class():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        meeting_link = request.form['meeting_link']
        date = request.form['date']
        time = request.form['time']
        uploaded_by = request.form['uploaded_by']
        conn = sqlite3.connect(DB)
        c = conn.cursor()
        c.execute("INSERT INTO learning_classes (title,description,meeting_link,date,time,uploaded_by) VALUES (?,?,?,?,?,?)",
                  (title, description, meeting_link, date, time, uploaded_by))
        conn.commit()
        conn.close()
        return redirect('/classes')
    return render_template('upload_class.html')

@app.route('/sos/<int:user_id>')
def sos(user_id):
    return render_template('sos.html', user_id=user_id)

@app.route('/chatbot', methods=['POST'])
def chatbot_api():
    msg = request.json.get('message','').lower()
    if 'order' in msg:
        reply = 'Open Orders page to see your orders.'
    elif 'webinar' in msg:
        reply = 'Visit /webinars to watch webinars.'
    elif 'class' in msg:
        reply = 'Visit /classes to join learning sessions.'
    elif 'sos' in msg:
        reply = 'Press the SOS button on the dashboard to call ambulance.'
    else:
        reply = "I can help with orders, webinars, classes, SOS, and hygiene."
    return jsonify({'reply': reply})

@app.route('/pharmacure/intro.html')
def pharmacure_intro():
    return send_from_directory('pharmacure', 'intro.html')

@app.route('/pharmacure/index.html')
def pharmacure_index():
    return send_from_directory('pharmacure', 'index.html')

@app.route('/pharmacure/cart.html')
def pharmacure_cart():
    return send_from_directory('pharmacure', 'cart.html')

@app.route('/pharmacure/checkout.html')
def pharmacure_checkout():
    return send_from_directory('pharmacure', 'checkout.html')

@app.route('/upload_prescription', methods=['GET', 'POST'])
def upload_prescription():
    if request.method == 'POST':
        # Save the uploaded file (mock logic, extend as needed)
        file = request.files.get('prescription')
        if file:
            upload_folder = os.path.join(app.root_path, 'static', 'prescriptions')
            os.makedirs(upload_folder, exist_ok=True)
            file.save(os.path.join(upload_folder, file.filename))
            return jsonify({'success': True, 'message': 'Prescription uploaded successfully!'})
        return jsonify({'success': False, 'message': 'No file uploaded.'}), 400
    # For GET, just return a minimal page or message (modal is handled in frontend)
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
