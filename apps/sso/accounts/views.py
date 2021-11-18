from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from django.views import View

from sso.broker import broker
from .events import AccountCreated, AccountAuthenticated
from .forms import SignUpForm, SignInForm


class SignInView(View):
    @staticmethod
    def get(request):
        form = SignInForm
        return render(request, 'accounts/sign-in.html', {'form': form})

    @staticmethod
    def post(request):
        form = SignInForm(request, request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                authenticated_event = AccountAuthenticated({
                    'public_id': 'qwe',
                    'accessToken': 'qwe'
                })
                broker.publish_message('auth-stream', authenticated_event)

                return redirect("https://example.com")
        return render(request, 'accounts/sign-in.html', {'form': form})


class SignUpView(View):
    @staticmethod
    def get(request):
        form = SignUpForm()
        return render(request, 'accounts/sign-up.html', {'form': form})

    @staticmethod
    def post(request):
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            created_event = AccountCreated({
                'public_id': 'qwe',
                'username': user.username,
                'role': 'admin' if user.is_staff else 'worker'
            })
            broker.publish_message('accounts-stream', str(created_event))

            login(request, user)
            authenticated_event = AccountAuthenticated({
                'public_id': 'qwe',
                'accessToken': 'qwe'
            })
            broker.publish_message('auth-stream', authenticated_event)

            return redirect("https://example.com")

        return render(request, "accounts/sign-up.html", {"form": form})
