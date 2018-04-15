from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest
# import datetime
from django.template.response import TemplateResponse
from django.shortcuts import redirect

#from django.http import HttpResponse
from django.urls import reverse
from django.http import HttpResponseRedirect
from api.models import User, PersonalEvent, ClubEvent, JoinedEvents
from django.views.generic import TemplateView
import json
from . import CASClient
from api.decorators import casauth


def react(request):
	# if logged in
	if 'netid' in request.session:
		return TemplateResponse(request, 'index.html', {})
	else:
		return HttpResponseRedirect(reverse('login'))

def test(request):
	return HttpResponse("test", status=400)
#------------------------------------------------------------------------------#
@casauth
def get_user(request, netid):
	user = User.objects.filter(netid=netid)
	if (len(user) != 1):
		return HttpResponse("User Not Found", status=404)
	user_json = serializers.serialize('json', user)
	return HttpResponse(user_json, content_type='application/json')

@casauth
def get_events_for_user(request, netid):
	user = User.objects.get(netid=netid)
	joinedevents = JoinedEvents.objects.filter(participant=user)
	if len(joinedevents) == 0:
		return HttpResponse("No joined events", status=404)
	joinedevents_json = serializers.serialize('json', joinedevents)
	return HttpResponse(joinedevents_json, content_type='application/json')

#------------------------------------------------------------------------------#
@casauth
def get_events(request):
	data = PersonalEvent.objects.all()
	data_json = serializers.serialize('json', data)
	return HttpResponse(data_json, content_type='application/json')

@casauth
def get_event(request, event_id):
	event = PersonalEvent.objects.filter(pk=event_id)
	if (len(event) != 1):
		return HttpResponse("Event Not Found", status=404)
	event_json = serializers.serialize('json', event)
	return HttpResponse(event_json, content_type='application/json')

@casauth
@csrf_exempt
def post_event(request):
	# get the json data
	data_json = json.loads(request.body)
	data = data_json[0]
	# author
	# if "netid" not in auth_attempt:
	# 	return HttpResponse("Not authenticated", status=403)
	# authornetid = request.session['netid']
	# author = User.objects.get(netid=authornetid)
	authornetid = data["author"]
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
	# event_json = json.loads(request.body)
	return HttpResponse(e)

@casauth
@csrf_exempt
def join_event(request):
	data_json = json.loads(request.body)
	data = data_json[0]
	event_id = int(data["event"])
	event_set = PersonalEvent.objects.filter(pk=event_id)
	event = PersonalEvent.objects.get(pk=event_id)
	# check if event full
	if (event.attendance >= event.capacity):
		return HttpResponse("EVENT FULL", status=400)

	participant_netid = data["netid"]
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
@csrf_exempt
def delete_event(request, event_id):
	event = PersonalEvent.objects.get(pk=event_id)
	title = event.title
	# check joined events for dependencies
	dependencies = JoinedEvents.objects.filter(event=event)
	if len(dependencies) > 0:
		dependencies.delete()
	# delete the event
	event.delete()
	return HttpResponse("deleted event " + str(event))
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
		return JsonResponse({'netid': ''})


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