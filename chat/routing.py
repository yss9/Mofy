# from channels.auth import AuthMiddlewareStack
# from channels.routing import ProtocolTypeRouter, URLRouter
# from django.core.asgi import get_asgi_application
from django.urls import re_path
#
# from .consumers import ChatConsumer
#
# application = ProtocolTypeRouter({
#     "http": get_asgi_application(),
#     "websocket": AuthMiddlewareStack(
#         URLRouter(
#             re_path(r'ws/chat/$', ChatConsumer.as_asgi()),
#         )
#     ),
# })

from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from .consumers import ChatConsumer

application = ProtocolTypeRouter(
    {
        "websocket": URLRouter(
            [
                path("ws/chat/", ChatConsumer.as_asgi()),
            ]
        ),
    }
)