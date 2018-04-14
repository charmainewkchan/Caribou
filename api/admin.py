from django.contrib import admin

from api.models import User
from api.models import PersonalEvent
from api.models import ClubEvent
from api.models import JoinedEvents

# Register your models here.
admin.site.register(User)
admin.site.register(PersonalEvent)
admin.site.register(ClubEvent)
admin.site.register(JoinedEvents)