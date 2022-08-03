from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView, UserRegister

app_name = 'users'

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('register/',UserRegister.as_view(), name="register_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
]
