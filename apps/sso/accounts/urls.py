from django.urls import path

from .views import SignUpView, SignInView

app_name = 'accounts'
urlpatterns = [
    path('sign-in', SignInView.as_view(), name='sign-in'),
    path('sign-up', SignUpView.as_view(), name='sign-up'),
]