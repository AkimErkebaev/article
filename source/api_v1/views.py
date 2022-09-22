from datetime import datetime

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed
import json

from django.views.decorators.csrf import ensure_csrf_cookie

from webapp.models import Article


@ensure_csrf_cookie
def get_token_view(request, *args, **kwargs):
    if request.method == 'GET':
        return HttpResponse()
    return HttpResponseNotAllowed(['GET'])


def add_view(request):
    print(request.POST)
    body = json.loads(request.body)
    a = body.get("A")
    b = body.get("B")
    print(body)
    if type(a) == int and type(b) == int:
        result = a + b
        response_data = {
            "answer": result
        }
        response = JsonResponse(response_data)
        return response
    if type(a) != int or type(b) != int:
        return JsonResponse({"message": "Need integers"}, status=400, )


def subtract_view(request):
    body = json.loads(request.body)
    a = body.get("A")
    b = body.get("B")
    if type(a) == int and type(b) == int:
        result = a - b
        response_data = {
            "answer": result
        }
        response = JsonResponse(response_data)
        return response
    if type(a) != int or type(b) != int:
        return JsonResponse({"message": "Need integers"}, status=404, )


def multiply_view(request):
    body = json.loads(request.body)
    a = body.get("A")
    b = body.get("B")
    if type(a) == int and type(b) == int:
        result = a * b
        response_data = {
            "answer": result
        }
        response = JsonResponse(response_data)
        return response
    if type(a) != int or type(b) != int:
        return JsonResponse({"message": "Need integers"}, status=404, )


def divide_view(request):
    body = json.loads(request.body)
    a = body.get("A")
    b = body.get("B")
    print(type(a))
    if type(a) == int and type(b) == int:
        if b == 0:
            return JsonResponse({"error": "Division by zero!"}, status=404, )
        else:
            result = a / b
            response_data = {
                "answer": result
            }
            response = JsonResponse(response_data)
            return response
    if type(a) != int or type(b) != int:
        return JsonResponse({"message": "Need integers"}, status=404, )


def article_view(request):
    if request.method == "GET":
        articles = Article.objects.values("title", "content")
        # articles = Article.objects.all()
        # articles_data = []

        # for article in articles:
        #     articles_data.append({
        #         "title": article.title,
        #         "content": article.content
        #     })
        # return JsonResponse(articles_data, safe=False)
        return JsonResponse(list(articles), safe=False)
    elif request.method == "POST":
        body = json.loads(request.body)
        if len(body.get("title")) < 5:
            return JsonResponse({"message": "Error"}, status=404, )
        article = Article.objects.create(**body)
        return JsonResponse({"id": article.id}, status=201)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])
