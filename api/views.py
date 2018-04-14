from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest
# import datetime

#from django.http import HttpResponse
from django.shortcuts import redirect
from api.models import User, PersonalEvent, ClubEvent, JoinedEvents
import json
from . import CASClient

# Create your views here.
def test(request):
	return HttpResponse("test", status=400)
#------------------------------------------------------------------------------#
def get_user(request, netid):
	user = User.objects.filter(netid=netid)
	if (len(event) != 1):
		return HttpResponse("User Not Found", status=404)
	user_json = serializers.serialize('json', user)
	return HttpResponse(user_json, content_type='application/json')

#------------------------------------------------------------------------------#
def get_events(request):
	data = PersonalEvent.objects.all()
	data_json = serializers.serialize('json', data)
	return HttpResponse(data_json, content_type='application/json')

def get_event(request, event_id):
	event = PersonalEvent.objects.filter(pk=event_id)
	if (len(event) != 1):
		return HttpResponse("Event Not Found", status=404)
	event_json = serializers.serialize('json', event)
	return HttpResponse(event_json, content_type='application/json')

@csrf_exempt
def post_event(request):
	# get the json data
	data_json = json.loads(request.body)
	data = data_json[0]
	# author
	if "netid" not in auth_attempt:
		return HttpResponse("Not authenticated", status=403)
	authornetid = request.session['netid']
	author = User.objects.get(netid=authornetid)
	# description
	description = data["description"]
	# title
	title = data["title"]
	# location
	location = data["location"]
	# eating club
	eating_club = author.eating_club
	# capacity
	capacity = int(data["capacity"])
	e = PersonalEvent(author = author, description = description, title = title, location = location, eating_club = eating_club, capacity = capacity)
	e.save()
	# event_json = json.loads(request.body)
	return HttpResponse(e)

@csrf_exempt
def join_event(request):
	event_id = int(data["event"])
	event = PersonalEvent.objects.get(pk=event_id)
	# check if event full
	if (event.attendance >= event.capacity):
		return HttpResponseBadRequest("EVENT FULL", status=400)
	data_json = json.loads(request.body)
	data = data_json[0]
	participant_netid = data["netid"]
	participant = User.objects.get(netid=participant_netid)

	# increment attendance
	event.attendance += 1
	# add to table
	j = JoinedEvents(participant=participant, event=event)
	j.save()
	return HttpResponse(j)

#------------------------------------------------------------------------------#
def get_club_events(request):
	data = ClubEvent.objects.all()
	data_json = serializers.serialize('json', data)
	return HttpResponse(data_json, content_type='application/json')

#------------------------------------------------------------------------------#
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