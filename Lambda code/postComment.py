import json
import boto3
from suds.client import Client
import requests
import datetime

from suds.client import Client
import requests

def lambda_handler(event, context):
    
    print(event);
    Content = ''
    Trials = ''
    Time = ''
    result = ''
    UserName =''
    StarPoint= ''
    
    # Extract Params   
    if event['body'].get('Content') is not None:
        Content = event['body']['Content']
    if event['body'].get('UserName') is not None:
        UserName = event['body']['UserName']   
    if event['body'].get('StarPoint') is not None:
        StarPoint = event['body']['StarPoint'] 
    print(Content)
    
    # Set Epoch Time
    try:
        now = datetime.datetime.now()
        year = lambda x: x.year
        month = lambda x: x.month
        day = lambda x: x.day
        hour = lambda x: x.hour
        minute = lambda x: x.minute
        #epoch_time = datetime.datetime(year(now), month(now), (day(now)+1), hour(now), minute(now)).timestamp()  
        #epoch_time=str(year(now))+ str(month(now))+ str(day(now)+1)+ str(hour(now))+ str(minute(now))
        epoch_time = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
        print(epoch_time)
    except Exception as e:
        print("message: Set time error")
        
    # Pass data to DynamoDB
    def put_device(Content, dynamodb=None):
        dynamodb = boto3.resource(
            'dynamodb', endpoint_url="https://dynamodb.ap-northeast-1.amazonaws.com")
        print(dynamodb)
        # Specify the table
        devices_table = dynamodb.Table('GameGiveBack')
        response = devices_table.put_item(
            # Data to be inserted
            Item={
                'Id': int(epoch_time),
                'Seq': int(epoch_time),
                'Content': Content,
                'UserName':UserName,
                'StarPoint':int(StarPoint)
            }
        )
        return response
    try:
        result = put_device(Content);
    except Exception as e:
        print("Upload data failed: " + str(e));
    
    return {
        'statusCode': 200,
        'body': result
    }
