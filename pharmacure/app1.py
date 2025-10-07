from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route('/pharmacure/index.html')
def pharmacure_index():
    return send_from_directory('.', 'index.html')

@app.route('/pharmacure/intro.html')
def intro():
    return send_from_directory('.', 'intro.html')

@app.route('/pharmacure/cart.html')
def cart():
    return send_from_directory('.', 'cart.html')

@app.route('/pharmacure/checkout.html')
def checkout():
    return send_from_directory('.', 'checkout.html')

if __name__ == '__main__':
    app.run(debug=True)
