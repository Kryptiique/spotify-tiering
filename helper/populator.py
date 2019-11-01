# Built-in Modules
import traceback
import os
import sqlite3
import uuid
import json
import random
import time
from datetime import datetime
import copy
import re


BUCKET_NAME = 'graffiti-root-prod-test'
SQL_LOC = 'C:/Users/Jay/Documents/GitHub/spotify-tiering/tiering-server/graphql_code/app_sql.db'
SIZE_LIMIT = 100

NONE = 0
NORMAL = 1
VERBOSE = 2
DBG = NORMAL
MOCK = False

def debug(string):
  out = '{0}\n{1}{0}\n'.format('\n=======================================================',
    string)
  print(out)

class Operation:

  conn = None
  csr = None
  index = 1
  processed = 1

  def connect(self):
    if os.path.exists(SQL_LOC):
      self.conn = sqlite3.connect(SQL_LOC)
      self.csr = self.conn.cursor()
      return True
    else:
      print("Could not connect to database; `{}` does not exist.".format(SQL_LOC))
      return False

  def close(self):
    self.conn.close()

  # Create Tables
  def create(self):
    # Check if already initialized
    try:
      self.csr.execute('Select * from Image')
      print("Tables already initialized.")
      return False
    except:
      print("Initializing MYSQL tables...")

    self.csr.execute(""" CREATE TABLE Circle (
      id	TEXT NOT NULL PRIMARY KEY UNIQUE,
      __typename TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      songCount INT,
      ownerId TEXT NOT NULL,
      image TEXT NOT NULL,
      spotifyLink TEXT NOT NULL,
      swapCap INTEGER,
      addCap INTEGER,
      initialAddCap INTEGER,
      frozen INTEGER,
      autoFreeze INTEGER,
      freezeSettings TEXT,
      joinLink TEXT,
      jointEffort INTEGER
    )""")

    self.csr.execute(""" CREATE TABLE User(
      id TEXT NOT NULL PRIMARY KEY UNIQUE,
      __typename TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      username TEXT NOT NULL,
      profilePic TEXT,
      reputation NUMERIC,
      spotifyLink TEXT NOT NULL,
      active INTEGER,
      displayName TEXT NOT NULL,
      sortCategory TEXT NOT NULL,
      sortDirection TEXT NOT NULL
    )""")

    self.csr.execute(""" CREATE TABLE UCLink(
      id TEXT NOT NULL PRIMARY KEY UNIQUE,
      __typename TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      linkCircleId TEXT NOT NULL,
      linkUserId TEXT NOT NULL,
      displayName TEXT NOT NULL,
      reputation NUMERIC
    )""")

    self.csr.execute(""" CREATE TABLE Song(
      id TEXT NOT NULL PRIMARY KEY UNIQUE,
      __typename TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      circleId TEXT NOT NULL,
      removeId TEXT NOT NULL,
      adderId TEXT NOT NULL,
      artist TEXT NOT NULL,
      album TEXT NOT NULL,
      albumArt TEXT NOT NULL,
      dateAdded TEXT NOT NULL,
      tier INTEGER,
      spotifyLink TEXT NOT NULL
    )""")

    self.csr.execute(""" CREATE TABLE Action(
      id TEXT NOT NULL PRIMARY KEY UNIQUE,
      __typename TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      ownerId TEXT NOT NULL,
      notificationUserId TEXT NOT NULL,
      circleId TEXT NOT NULL,
      image TEXT NOT NULL,
      message TEXT NOT NULL,
      link TEXT NOT NULL,
      date TEXT NOT NULL
    )""")

    self.csr.execute(""" CREATE TABLE Swap(
      id TEXT NOT NULL PRIMARY KEY UNIQUE,
      __typename TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      authorId TEXT NOT NULL,
      circleId TEXT NOT NULL,
      date TEXT NOT NULL,
      originalId TEXT NOT NULL,
      replacementId TEXT NOT NULL
    )""")

    self.csr.execute(""" CREATE TABLE Comment(
      id TEXT NOT NULL PRIMARY KEY UNIQUE,
      __typename TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      authorId TEXT NOT NULL,
      songId TEXT NOT NULL,
      date TEXT NOT NULL,
      body TEXT NOT NULL
    )""")

    self.csr.execute(""" CREATE TABLE UTLink(
      id TEXT NOT NULL PRIMARY KEY UNIQUE,
      __typename TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      userId TEXT NOT NULL,
      threadId TEXT NOT NULL
    )""")

    self.csr.execute(""" CREATE TABLE Thread(
      id TEXT NOT NULL PRIMARY KEY UNIQUE,
      __typename TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )""")

    self.csr.execute(""" CREATE TABLE Message(
      id TEXT NOT NULL PRIMARY KEY UNIQUE,
      __typename TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      threadId TEXT NOT NULL,
      senderId TEXT NOT NULL,
      dateSent TEXT NOT NULL
    )""")

    self.csr.execute(""" CREATE TABLE Like(
      id TEXT NOT NULL PRIMARY KEY UNIQUE,
      __typename TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      songId TEXT NOT NULL,
      userId TEXT NOT NULL
    )""")

    # self.csr.execute(""" CREATE TABLE(
      # id TEXT NOT NULL PRIMARY KEY UNIQUE,
      # __typename TEXT NOT NULL,
      # createdAt TEXT NOT NULL,
      # updatedAt TEXT NOT NULL,

      # )
    # """)

    if not MOCK: self.conn.commit()

    return True

  # Gets a unique UUID for putting in the table
  def autoID(self, table):
    while True:
      id = uuid.uuid4()
      self.csr.execute("SELECT * FROM {} WHERE id='{}'".format(table, id))
      res = self.csr.fetchall()

      if len(res) == 0:
        return str(id)


if __name__ == "__main__":
  op = Operation()

  print()
  connected = op.connect()

  if connected:
    init = op.create()
    
    print('\033[0;37;40m Done.\t- \033[1;32;40m[{}]'.format(time.strftime("%H:%M::%S")))
    op.close()