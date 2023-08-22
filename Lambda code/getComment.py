import json
import boto3
from suds.client import Client
import requests
import datetime
from operator import itemgetter, attrgetter
from boto3.dynamodb.conditions import Key

client = boto3.client('dynamodb')
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
  print(event)
  table=dynamodb.Table('GameGiveBack')
  data = table.scan()
  data = sorted(data['Items'], key=itemgetter('Seq'),reverse=True)
  
  print(data)
 
  
  #response = {
  #    'statusCode': 200,
  #    'body': json.dumps(data),
  #    'headers': {
  #      'Content-Type': 'application/json',
  #      'Access-Control-Allow-Origin': '*'
  #    },
  #}
  #return sorted(data['Items'], key=itemgetter('Score'))
  return data;  