from django.urls import path, include

from api_v1.views import add_view, get_token_view, article_view, subtract_view, divide_view, multiply_view

app_name = "api_v1"

urls_articles = [
    path("", article_view, name="article_view")
]

urlpatterns = [
    path("add", add_view, name="add"),
    path("get_token", get_token_view),
    path("articles", include(urls_articles)),
    path("subtract", subtract_view, name="subtract"),
    path("multiply", multiply_view, name="multiply"),
    path("divide", divide_view, name="divide"),
]