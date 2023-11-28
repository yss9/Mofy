

import os

from channels.routing import ProtocolTypeRouter
from django.core.asgi import get_asgi_application
import os
from django.core.asgi import get_asgi_application
from django.urls import re_path
from chat.consumers import app as socketio_app

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'drfProject.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": socketio_app,
})
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "drfProject.settings")

application = get_asgi_application()
