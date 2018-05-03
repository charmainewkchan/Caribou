# purge_old_data.py

from django.core.management.base import BaseCommand, CommandError
from api.models import PersonalEvent, JoinedEvents, User, PastJoinedEvents, PastEvent
from datetime import datetime, timedelta
from crontab import Crontab

class Command(BaseCommand):
    help = 'Delete objects that end date has passed'

    def handle(self, *args, **options):
    	# find events to delete
    	for event in PersonalEvent.objects.all():
    		date = event.date.split("-")
    		time = event.end.split(":")
    		enddatetime = datetime.datetime(int(date[0]), int(date[1]), int(date[2]), int(time[0]), int(time[1]))
    		# older dates are smaller
    		if enddatetime < datetime.now():
	    		# copy them to new table
	    		pe = PastEvent(author=event.author,title=event.title,description=event.description,location=event.location,start=event.start,end=event.end,eating_club=event.eating_club)
	    		pe.save()
    			# make new past joined events
    			for je in JoinedEvents.objects.filter(event=event):
    				pje = PastJoinedEvents(participant=je.participant,event=pe)
    				je.delete() # delete old joined events
    			# delete old event
    			event.delete()