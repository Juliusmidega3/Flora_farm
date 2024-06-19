from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User, auth
from django.contrib import messages
from .models import Why_us, Testimonials, Product, FeaturedProducts, Seeds, Fruits, Fertilizers, Equipment, Pesticides, AnimalFeeds, AgricuturalServices

def index(request):
    testmonies = Testimonials.objects.all()
    featured_products = FeaturedProducts.objects.all()
    
    return render(request, 'index.html', {'testmonies': testmonies, 'featured_products': featured_products})

def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        password2 = request.POST['password2']

        if password == password2:
            if User.objects.filter(email=email).exists():
                messages.info(request, 'Email Already in use')
                return redirect('register')
            elif User.objects.filter(username=username).exists():
                messages.info(request, 'Username Already Exist!')
                return redirect('register')  
            else:
                user = User.objects.create_user(username=username, email=email, password=password)
                user.save()
                return redirect('login')
        else:
            messages.info(request, 'Password do not match')
            return redirect('register')
    else:
        return render(request, 'register.html')

def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return redirect('/')
        else:
            messages.info(request, 'Credentials Invalid')
            return redirect('login')
    else:
        return render(request, 'login.html')

def logout(request):
    auth.logout(request)
    return redirect('/')

def products(request):
    seeds = Seeds.objects.all()
    fruits = Fruits.objects.all()
    fertilizers = Fertilizers.objects.all()
    equipment = Equipment.objects.all()
    pesticides = Pesticides.objects.all()
    animal_feeds = AnimalFeeds.objects.all()
    agricultural_services = AgricuturalServices.objects.all()

    context = {
        'Seeds': seeds,
        'Fruits': fruits,
        'Fertilizers': fertilizers,
        'Equipments': equipment,
        'Pesticides': pesticides,
        'AnimalFeeds': animal_feeds,
        'AgricuturalServices': agricultural_services,
    }

    return render(request, 'products.html', context)

def process_checkout(request):
    
    return render(request, 'checkout.html')



def search_products(request):
    query = request.GET.get('query', '')
    results = []

    if query:
        seeds_results = Seeds.objects.filter(name__icontains=query)
        fruits_results = Fruits.objects.filter(name__icontains=query)
        fertilizers_results = Fertilizers.objects.filter(name__icontains=query)
        equipment_results = Equipment.objects.filter(name__icontains=query)
        pesticides_results = Pesticides.objects.filter(name__icontains=query)
        animal_feeds_results = AnimalFeeds.objects.filter(name__icontains=query)
        agricultural_services_results = AgricuturalServices.objects.filter(name__icontains=query)

        results = list(seeds_results) + list(fruits_results) + list(fertilizers_results) + list(equipment_results) + list(pesticides_results) + list(animal_feeds_results) + list(agricultural_services_results)

    return render(request, 'products.html', {'products': results, 'query': query})