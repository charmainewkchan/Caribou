from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest

from django.template.response import TemplateResponse
from django.shortcuts import redirect

from django.urls import reverse
from django.http import HttpResponseRedirect
from api.models import User, PersonalEvent, ClubEvent, JoinedEvents
from django.views.generic import TemplateView
import json
from . import CASClient
from api.decorators import casauth

@casauth
def react(request):
	return TemplateResponse(request, 'index.html', {})

def test(request):
	return HttpResponse("test", status=400)

def login_test(request, netid);
	request.session['netid'] = netid
	return HttpResponse("logged in", status=200)

	
#------------------------------------------------------------------------------#
@casauth
def get_user(request, netid):
	user = User.objects.filter(netid=netid)
	if (len(user) != 1):
		return HttpResponse("User Not Found", status=404)
	user_json = serializers.serialize('json', user)
	return HttpResponse(user_json, content_type='application/json')

@casauth
def delete_user(request):
	netid = request.session['netid']
	user_set = User.objects.filter(netid=netid)
	user = User.objects.get(netid=netid)
	if len(user_set) != 1:
		return HttpResponse("User Not Found", status=404)
	# check joined events for dependencies
	dependencies_j = JoinedEvents.objects.filter(participant=user)
	if len(dependencies_j) > 0:
		# access the events they've joined 
		event_ids = [j.event.id for j in joined_events]
		events = PersonalEvent.objects.filter(id__in=event_ids)
		for e in events: # decrement attendance
			att = e.attendance - 1
			e.attendance = att
			e.save()
	dependencies_j.delete() # remove the joinedevents entries
	# check hosted events for dependencies
	dependencies_e = PersonalEvent.objects.filter(author=user)
	if len(dependencies_e) > 0:
		dependencies_e.delete()
	# delete the user
	user.delete()
	return HttpResponse("deleted user " + netid)

@casauth
def get_events_for_user(request, netid):
	user = User.objects.get(netid=netid)
	joined_events = JoinedEvents.objects.filter(participant=user)
	# make a list of the event ids
	event_ids = [j.event.id for j in joined_events]
	events = PersonalEvent.objects.filter(id__in=event_ids)
	events_json = serializers.serialize('json', events)
	return HttpResponse(events_json, content_type='application/json')

#------------------------------------------------------------------------------#
@casauth
def get_events(request):
	netid = request.session['netid']
	dataq = PersonalEvent.objects.all()
	data_json = serializers.serialize('json', dataq)
	data = json.loads(data_json)
	# manipulate data to add owner field, 0 is not owner, 1 is owner
	for e in data: # e is the outer dictionary for the event
		userpk = int(e["fields"]["author"]) # get user pkid
		author = User.objects.get(pk=userpk).netid # user netid
		if author == netid:
			e["owner"] = 1
		else:
			e["owner"] = 0
	data_json = json.dumps(data)
	return HttpResponse(data_json, content_type='application/json')

@casauth
def get_event(request, event_id):
	event = PersonalEvent.objects.filter(pk=event_id)
	if (len(event) != 1):
		return HttpResponse("Event Not Found", status=404)
	event_json = serializers.serialize('json', event)
	return HttpResponse(event_json, content_type='application/json')

@casauth
def hosted_events(request):
	netid = request.session['netid']
	user = User.objects.get(netid=netid1)
	events = PersonalEvent.objects.filter(author=user)
	events_json = serializers.serialize('json', events)
	return HttpResponse(events_json, content_type='application/json')

@casauth
def get_users_for_event(request, event_id):
	event = PersonalEvent.objects.get(pk=int(event_id))
	joined_users = JoinedEvents.objects.filter(event=event)
	# make a list of the user ids
	user_ids = []
	for j in joined_users:
		user_id = j.participant.id
		user_ids.append(user_id)
	users = User.objects.filter(id__in=user_ids)
	users_json = serializers.serialize('json', users)
	return HttpResponse(users_json, content_type='application/json')

@csrf_exempt
@casauth
def post_event(request):
	# get the json data
	data_json = json.loads(request.body)
	data = data_json[0]
	# author
	authornetid = request.session['netid']# @casauth ensures they are logged in
	author = User.objects.get(netid=authornetid)
	description = data["description"]
	title = data["title"]
	date = data["date"]
	start = data["start"]
	end = data["end"]
	location = data["location"]
	eating_club = author.eating_club
	capacity = int(data["capacity"])
	e = PersonalEvent(author = author, description = description, title = title, date = date, start=start, end=end, location = location, eating_club = eating_club, capacity = capacity)
	e.save()
	return HttpResponse(e)

@csrf_exempt
@casauth
def delete_event(request, event_id):
	authornetid = request.session['netid'] # @casauth ensures they are logged in
	author = User.objects.get(netid=authornetid)
	event_set = PersonalEvent.objects.filter(pk=event_id)
	if len(event_set) != 1:
		return HttpResponse("Event Not Found", status=404)
	event = PersonalEvent.objects.get(pk=event_id)
	# check if the author is correct
	if (event.author != author):
		return HttpResponse("Permission Denied", status=403)
	title = event.title
	# check joined events for dependencies
	dependencies = JoinedEvents.objects.filter(event=event)
	if len(dependencies) > 0:
		dependencies.delete()
	# delete the event
	event.delete()
	return HttpResponse("deleted event " + title)

#------------------------------------------------------------------------------#
@csrf_exempt
@casauth
def join_event(request):
	data_json = json.loads(request.body)
	data = data_json[0]
	event_id = int(data["event"])
	event_set = PersonalEvent.objects.filter(pk=event_id)
	# event not found
	if len(event_set) != 1:
		return HttpResponse("Event Not Found", status=404)
	event = PersonalEvent.objects.get(pk=event_id)
	# check if event full
	if (event.attendance >= event.capacity):
		return HttpResponse("Event Full", status=400)

	participant_netid = request.session['netid']
	participant = User.objects.get(netid=participant_netid)
	alreadyjoined = JoinedEvents.objects.filter(participant=participant).filter(event=event)
	if len(alreadyjoined) > 0:
		return HttpResponse("Already Joined", status=400)
	# increment attendance
	newatt = event.attendance + 1
	event_set.update(attendance=newatt)
	# add to table
	j = JoinedEvents(participant=participant, event=event)
	j.save()
	return HttpResponse(participant_netid + " joined " + str(event_id) + " " + str(event) + " attendance now " + str(newatt))

@casauth
def unjoin_event(request):
	data_json = json.loads(request.body)
	data = data_json[0]
	event_id = int(data["event"])
	event_set = PersonalEvent.objects.filter(pk=event_id)
	# event not found
	if len(event_set) != 1:
		return HttpResponse("Event Not Found", status=404)
	event = PersonalEvent.objects.get(pk=event_id)
	# check if currently in event
	participant_netid = request.session['netid']
	participant = User.objects.get(netid=participant_netid)
	joined = JoinedEvents.objects.filter(participant=participant).filter(event=event)
	if len(joined) != 1: # if not joined in this event
		return HttpResponse("Event Not Joined", status=400)
	# decrement attendance
	newatt = event.attendance - 1
	event_set.update(attendance=newatt)
	# remove from table
	joined.delete()
	return HttpResponse(participant_netid + " unjoined " + str(event_id) + " " + str(event) + " attendance now " + str(newatt))

#------------------------------------------------------------------------------#
@casauth
def get_club_events(request):
	data = ClubEvent.objects.all()
	data_json = serializers.serialize('json', data)
	return HttpResponse(data_json, content_type='application/json')

#------------------------------------------------------------------------------#
@casauth
def netid(request):
	if 'netid' in request.session:
		return JsonResponse({'netid': request.session['netid']})
	else:
		return TemplateResponse(request, 'index.html', {})


def login(request):
	C = CASClient.CASClient(request)

	auth_attempt = C.Authenticate()
	if "netid" in auth_attempt:  # Successfully authenticated.
		print("successfully authenticted")
		request.session['netid'] = auth_attempt['netid']
		return redirect("https://bixr.herokuapp.com")
	elif "location" in auth_attempt:  # Redirect to CAS.
		return redirect(auth_attempt["location"])
	else:  # This should never happen!
		abort(500)
