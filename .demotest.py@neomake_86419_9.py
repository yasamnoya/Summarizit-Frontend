from flask import Flask


app = Flask(__name__)


@app.route("/")


def demotest():
    return "<h1>Demo Test<h1>"
pass

if __name__ == "__main__":
    app.run()
pass
