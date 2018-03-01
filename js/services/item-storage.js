angular.module('AngularApp')
    .factory('ItemStorage',['$http','$q',function ItemStorageFactory($http,$q) {

        var fact = this;
        fact.listA = [];
        fact.listB = [];

        return {
            getListA: function() {
                 return $http.get('http://localhost:8080/angular/items/1').then(function(response) {
                    fact.listA = response.data;
                    return fact.listA;
                });
            },
            getListB: function() {
                return $http.get('http://localhost:8080/angular/items/2').then(function(response) {
                   fact.listB = response.data;
                   return fact.listB;
               });
            },
            removeFromListA: function(item) {
                return $http({
                    method: 'DELETE',
                    url: 'http://localhost:8080/angular/items',
                    data: item,
                    headers: {
                        'Content-type': 'application/json;charset=utf-8'
                    }
                }).then(function(response){
                    $http.get('http://localhost:8080/angular/items/1').then(function(response) {
                       fact.listA = response.data;
                   });
                });
            },
            removeFromListB: function(item) {
                var deffered = $q.defer();
                return $http({
                    method: 'DELETE',
                    url: 'http://localhost:8080/angular/items',
                    data: item,
                    headers: {
                        'Content-type': 'application/json;charset=utf-8'
                    }
                });
            },
            addToListA: function(item) {
                var deffered = $q.defer();
                if ( !item || item.name == "")
                {
                    deffered.reject();
                    return deffered.promise;
                }

                for(var i = 0; i < fact.listA.length; i++)
                    if(fact.listA[i].name == item.name)
                    {
                        deffered.reject();
                        return deffered.promise;
                    }
                for(var i = 0; i < fact.listB.length; i++)
                    if(fact.listB[i].name == item.name)
                    {
                        deffered.reject();
                        return deffered.promise;
                    }
                return $http.post('http://localhost:8080/angular/items',item).then(function(response){
                    fact.listA.push(item);
               });

            },
            addToListB: function(item) {
                var deffered = $q.defer();

                if (!item || item.name == "")
                {
                    deffered.reject();
                    return deffered.promise;
                }
                for(var i = 0; i < fact.listA.length; i++)
                    if(fact.listA[i].name == item.name)
                    {
                        deffered.reject();
                        return deffered.promise;
                    }
                for(var i = 0; i < fact.listB.length; i++)
                    if(fact.listB[i].name == item.name)
                    {
                        deffered.reject();
                        return deffered.promise;
                    }

                return $http.post('http://localhost:8080/angular/items',item).then(function(response){
                    $http.get('http://localhost:8080/angular/items/2').then(function(response) {
                       fact.listB.push(item);
                   });
                });
            },
        }
    }]);
