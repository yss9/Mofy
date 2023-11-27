import os
from django.core.asgi import get_asgi_application

# 환경변수 설정
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# Django ASGI 애플리케이션 초기화
django_asgi_app = get_asgi_application()

# channels 라우팅과 미들웨어는 Django 초기화 이후에 가져와야 합니다.
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
import chat.routing  # 이제 이 코드는 안전하게 실행될 수 있습니다.

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket":
        AuthMiddlewareStack(
            AllowedHostsOriginValidator(
            URLRouter(
                chat.routing.websocket_urlpatterns
            )
        ),
    ),
})