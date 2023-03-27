import requests
from bs4 import BeautifulSoup as bs
import csv
import pandas as pd


URL='https://mangakakalot.com/manga_list?type=topview&category=all&state=all&page='
headers =['Title', 'Manga link', 'Title Image source']

for page in range(0,1481):
 
    req = requests.get(URL + str(page) + '/')
    soup = bs(req.text, 'html.parser')
    s = soup.find_all('div', class_="list-truyen-item-wrap")
    for i in range(len(s)) :
        s = soup.find_all('div', class_="list-truyen-item-wrap")
        content_tag=(s[i].a)
        title =[content_tag.get('title')]
        link = [content_tag.get('href')]
        
        images = content_tag.select('img')
        for image in images:
            images_list = [image.get('src')]
            rows = zip(title,link,images_list)
            with open('listtocsv1.csv', 'a' ,encoding="utf-8") as file:
                writer = csv.writer(file)
                for row in rows:
                    writer.writerow(row)