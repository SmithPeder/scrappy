import json
import datetime
import time

scrape = open('scrape.txt', 'r')
scrapeObject = {}
scrapeObject['properties'] = []

arr = []
for l in scrape:
    arr.append(l.split('¤'))

# LINE STRUCT [id , adr , sold , listprice , names , firm , records]
for l in arr:
    property_id = l[0]
    property_adr = l[1]
    property_sold = False
    if(l[2].strip() == "SOLGT"):
        property_sold = True
    property_listprice = l[3]
    tempName = l[4].split('§')
    property_sellers = []
    for e in tempName:
        if e != '':
            obj = {
                "name": e.strip(),
                "firm": l[5]
            }
            property_sellers.append(obj)
    tempRecords = l[6].split()
    property_records = []
    for i in range(0,len(tempRecords),2):
        obj = {
            "sold" : tempRecords[i][0:2] + "/" + tempRecords[i][2:4] +  "/" + tempRecords[i][4:8],
            "price" : tempRecords[i+1]
        }
        property_records.append(obj)

    property_object = {
        "property_id": property_id,
        "property_adr": property_adr,
        "property_sold": property_sold,
        "property_listprice": property_listprice,
        "property_sellers": property_sellers,
        "property_records": property_records
    }
    scrapeObject['properties'].append(property_object)

timeStamp = datetime.datetime.fromtimestamp(time.time()).strftime('%d%m%Y-%H%M%S') + ".json"
with open(timeStamp, 'w') as snapshot:
    json.dump(scrapeObject, snapshot)
with open('db.json', 'w') as db:
    json.dump(scrapeObject, db)
