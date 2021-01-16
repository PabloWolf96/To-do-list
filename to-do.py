from flask import Flask, render_template, url_for
import date
app = Flask(__name__)
tdy = date.today()



@app.route('/')
def home():
    return render_template("to-do.html", tdy=tdy)

if __name__ == '__main__':
    app.run(debug=1)