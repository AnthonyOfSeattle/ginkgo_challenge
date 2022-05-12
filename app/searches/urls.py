from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from searches import views

urlpatterns = [
    path('searches/', views.SearchList.as_view()),
    path('searches/<int:pk>/', views.SearchDetail.as_view()),
    path('searches/<int:pk>/result', views.SearchResultDetail.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
