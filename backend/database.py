import sqlite3

def init_db():
    conn = sqlite3.connect("deliveries.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS deliveries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pickup TEXT,
            dropoff TEXT,
            date TEXT,
            time TEXT,
            packageType TEXT,
            ecoFriendly INTEGER
        )
    """)
    conn.commit()
    conn.close()

def insert_delivery(data):
    conn = sqlite3.connect("deliveries.db")
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO deliveries (pickup, dropoff, date, time, packageType, ecoFriendly)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (data.pickup, data.dropoff, data.date, data.time, data.packageType, int(data.ecoFriendly)))
    conn.commit()
    conn.close()

def get_all_deliveries():
    conn = sqlite3.connect("deliveries.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM deliveries")
    deliveries = cursor.fetchall()
    conn.close()
    return deliveries
