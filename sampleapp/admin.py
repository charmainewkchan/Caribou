from django.contrib import admin
from sampleapp.models import User
from sampleapp.models import PersonalEvent
from sampleapp.models import ClubEvent

# Register your models here.
admin.site.register(User)
admin.site.register(PersonalEvent)
admin.site.register(ClubEvent)