from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrape

app = Flask(_name_)
app.config("MONGO_URI") = 'mongodb://localhost:27017/mars_db'
mongo = PyMongo(app)

@app.route("/")
def index():
    mars_data = db.collection.find_one()
    return render-template('./index.html', list=mars_data)

app.route("/scrape")
def scrappe():
    scrape.scrape_all
    mars = mongo.db.mars
    return redirect ("/") 

