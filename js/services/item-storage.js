angular.module('AngularApp')
    .factory('ItemStorage',['$http','$q',function ItemStorageFactory($http,$q) {

        var fact = this;
        fact.listA = [];
        fact.listB = [];

        return {
            getListA: function() {
                 return $http.get('http://localhost:8080/angular/items/1').then(function(response) {
                    fact.listA = response.data;
                    // console.log(list);
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
                console.log("** " + item);
                console.log(fact.listA);
                console.log(fact.listB);
                if ( !item || item.name == "")
                    {deffered.reject();
                        console.log("xxxxx");
                    return deffered.promise;}

                // if (fact.listA.indexOf(item) !== -1 || fact.listB.indexOf(item) !== -1)
                //     deffered.reject();
                for(var i = 0; i < fact.listA.length; i++)
                    if(fact.listA[i].name == item.name)
                        {deffered.reject();
                        console.log(fact.listA[i].name+" "+item);
                        return deffered.promise;}
                for(var i = 0; i < fact.listB.length; i++)
                    if(fact.listB[i].name == item.name)
                        { deffered.reject();
                            console.log(fact.listB);
                        return deffered.promise;}
                // listA.push(item);
                console.log("2222");

                return $http.post('http://localhost:8080/angular/items',item).then(function(response){
                    $http.get('http://localhost:8080/angular/items/1').then(function(response) {
                       fact.listA = response.data;

                   },function(error){
                       console.log("1 " + error);
                   });
               }, function(error){
                 console.log("2 " + error);
               });

            },
            addToListB: function(item) {
                var deffered = $q.defer();

                console.log(fact.listB);
                if (!item || item.name == "")
                    {deffered.reject();
                    return deffered.promise;}
                // if (fact.listA.indexOf(item) !== -1 || fact.listB.indexOf(item) !== -1)
                //     deffered.reject();
                for(var i = 0; i < fact.listA.length; i++)
                    if(fact.listA[i].name == item.name)
                        {deffered.reject();
                        console.log(fact.listA[i].name+" "+item);
                        return deffered.promise;}
                for(var i = 0; i < fact.listB.length; i++)
                    if(fact.listB[i].name == item.name)
                        { deffered.reject();
                        return deffered.promise;}
                // listA.push(item);
            //    console.log("2222");

                return $http.post('http://localhost:8080/angular/items',item).then(function(response){
                    $http.get('http://localhost:8080/angular/items/2').then(function(response) {
                       fact.listB = response.data;
                   });
                });
            },
        }



    }]);
