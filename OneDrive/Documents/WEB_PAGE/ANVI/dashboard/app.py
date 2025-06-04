from flask import Flask, Response, render_template, abort, url_for, stream_with_context
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Replace with your actual upstream stream URL
PINGGY_STREAM_URL = "https://rnzdi-2401-4900-1c0f-5c9d-684f-b11d-f377-b01e.a.free.pinggy.link/video_feed"

@app.route("/")
def dashboard():
    """
    Renders the main dashboard (index.html).
    """
    return render_template("index.html")

@app.route("/live_feed")
def live_feed():
    return render_template("live_feed.html")

@app.route("/Patrol_Routes")
def patrol_routes():
    return render_template("Patrol_Routes.html")

@app.route("/Alerts")
def alerts():
    return render_template("Alerts.html")

@app.route("/Analytics")
def analytics():
    return render_template("Analytics.html")

@app.route("/Maintenance")
def maintenance():
    return render_template("Maintenance.html")

@app.route("/Settings")
def settings():
    return render_template("Settings.html")

@app.route("/proxy")
def proxy():
    """
    Acts as a proxy for the upstream MJPEG/H.264 stream.
    Clients accessing /proxy will receive the content from PINGGY_STREAM_URL.
    """
    try:
        upstream = requests.get(PINGGY_STREAM_URL, stream=True, timeout=30)
        if upstream.status_code != 200:
            abort(502, description=f"Upstream returned HTTP {upstream.status_code}")
    except requests.RequestException as e:
        abort(502, description=f"Could not connect to upstream: {e}")

    def generate():
        try:
            for chunk in upstream.iter_content(chunk_size=1024):
                if chunk:
                    yield chunk
        except requests.exceptions.ChunkedEncodingError:
            print("[ERROR] Connection broken: Incomplete or unexpected end of stream")
        except requests.exceptions.RequestException as e:
            print(f"[ERROR] Upstream exception: {e}")
        # Exit silently if any error occurs after headers are sent
        return

    # Preserve upstream Content-Type, defaulting to MJPEG
    headers = {
        'Content-Type': upstream.headers.get(
            'Content-Type',
            'multipart/x-mixed-replace; boundary=frame'
        )
    }

    return Response(stream_with_context(generate()), headers=headers)

if __name__ == "__main__":
    # By default, Flask runs on http://127.0.0.1:5000
    app.run(debug=True, host="0.0.0.0", port=9000)
