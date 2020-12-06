import numpy as np
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
#  Setup
#################################################
engine = create_engine("sqlite:///Resources/hawaii.sqlite")

# This is to transition the original database into the new model
Initial_Base = automap_base()
# Then we need to represent in a table through a 'reflect'.
Initial_Base.prepare(engine, reflect=True)

# Save references to each table
Measurement_Initial_Base = Initial_Base.classes.measurement
Station_Initial_Base = Initial_Base.classes.station

# Create our session (link) from Python to the DB
link = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/api/v1.0/precipitation")
def precipitation():
    """Return the JSON representation of your dictionary."""
    # Query all precipitation
    results = link.query(Measurement_Initial_Base.date, Measurement_Initial_Base.prcp).\
                order_by(Measurement_Initial_Base.date).all()

    # Convert the query results to a Dictionary using date as the key and prcp as the value.
    all_precipitation=[]
    for precip in results:
        precip_dict = {}
        precip_dict["date"] = precip.date
        precip_dict["prcp"] = precip.prcp
        all_precipitation.append(precip_dict)

    return jsonify(all_precipitation)
	
@app.route("/api/v1.0/stations")
def stations():
    """Return the JSON representation of your dictionary."""
    # Query list of stations and counts
    results = link.query(Measurement_Initial_Base.station, func.count(Measurement_Initial_Base.station)).\
                group_by(Measurement_Initial_Base.station).\
                order_by(func.count(Measurement_Initial_Base.station).desc()).all()

    # Convert the query results to a list of stations inside Dicitonary
    all_stations=[]
    for row in results:
        station_dict = {}
        station_dict["station"] = row[0]
        station_dict["count"] = row[1]
        all_stations.append(station_dict)

    return jsonify(all_stations)


if __name__ == '__main__':
    app.run(debug=True)