from machine import Pin, ADC
import dht
import umqtt.robust as mqtt
import json
import time
import urandom
import urequests

from _global import (
    MQTTBROKER,
    MQTTPORT,
    MQTTUSER,
    MQTTPASS,
    MIC_FEED,
    HMD_FEED,
    TMP_FEED,
    LDR_FEED,
    TMP,
    MIC,
    LDR
)

# Initialize sensors for temperature, humidity, light, and sound
dht_sensor = dht.DHT22(Pin(TMP))
ldr_sensor = Pin(LDR, Pin.IN)
mic_sensor = ADC(0)

client = None

# Heart Rate Feed (randomized)
HR_FEED = "sarangrastogi/feeds/heart-rate"  # Replace with your actual feed name

# Callback to handle incoming MQTT messages
def message_callback(topic, msg):
    print((topic, msg))

def heart_rate():
    return 100 + urandom.getrandbits(4)  # 4 bits gives numbers between 0 and 15, shift range to 100-115

# Function to get the current timestamp
def get_timestamp():
    return time.localtime()  # Get current time as a tuple

# Format the timestamp to a string (ISO 8601 format)
def format_timestamp():
    t = get_timestamp()
    return "{:04}-{:02}-{:02}T{:02}:{:02}:{:02}".format(t[0], t[1], t[2], t[3], t[4], t[5])

# Function to send data to Next.js server
def send_to_nextjs(data):
    url = "http://192.168.25.151:3000/api/get-data"  # Replace with your actual API route
    headers = {"Content-Type": "application/json"}
    
    try:
        # Convert data to JSON format
        json_data = json.dumps(data)
        
        # Send the POST request
        response = urequests.post(url, data=json_data, headers=headers)
        
        # Print server response
        print("Response from Next.js server:", response.text)
        
        # Close the response to free memory
        response.close()
    
    except Exception as e:
        print("Failed to send data to Next.js server:", e)

# Setup MQTT connection and publish data
def setup_mqtt():
    try:
        global client
        # Initialize MQTT client
        client = mqtt.MQTTClient(
            "ESP8266",         # Device identifier
            MQTTBROKER,        # Broker address
            port=MQTTPORT,     # MQTT port
            user=MQTTUSER,     # MQTT username
            password=MQTTPASS  # MQTT password
        )
        client.set_callback(message_callback)
        client.connect()
        
        while True:
            # Measure and publish actual sensor data
            dht_sensor.measure()
            temp = dht_sensor.temperature()
            humi = dht_sensor.humidity()
            ldr_value = ldr_sensor.value()
            mic_value = mic_sensor.read()
            hr_value = heart_rate()

            # Prepare data to send to Next.js server
            data = {
                "timestamp": format_timestamp(),  # Include timestamp
                "temperature": temp,
                "humidity": humi,
                "light": ldr_value,
                "mic_value": mic_value,
                "heart_rate": hr_value
            }

            # Publish data to Adafruit IO via MQTT
            client.publish(TMP_FEED, json.dumps({"value": temp}))
            client.publish(HMD_FEED, json.dumps({"value": humi}))
            client.publish(LDR_FEED, json.dumps({"value": ldr_value}))
            client.publish(MIC_FEED, json.dumps({"value": mic_value}))
            client.publish(HR_FEED, json.dumps({"value": hr_value}))  # Publish random heart rate value

            # Send data to Next.js server
            send_to_nextjs(data)

            
            time.sleep(10)

    except OSError as e:
        print("Error:", e)
        print("Reconnecting to MQTT broker...")
        time.sleep(5)
        setup_mqtt()  # Retry connection

# Run MQTT setup
setup_mqtt()