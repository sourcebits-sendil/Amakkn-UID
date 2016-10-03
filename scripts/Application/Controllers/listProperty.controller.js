/**
 * @author: Sendil
 * @since(mm/dd/yy): 9/26/2016
 */
(function() {
    'use strict';
    angular.module('amakkn').controller('listPropertyController', listPropertyController);
    /* @ngInject */
    function listPropertyController($log, $scope, $http, $timeout, $filter, httpService, $location, $rootScope, NgMap, $mdToast, $mdSelect) {
        var vm = this;
        var marker;
        vm.class = 'listPropertyController';
        $scope.propertiesTypeData = null;
        $scope.propertiesTypeCount = null;
        $scope.propCategory = "1";
        $scope.amenityListData = null;
        $scope.featureListData = null;
        $scope.amenityListCount = null;
        $scope.currStatus = true;
        $scope.currentNavItem = "Resi";
        var geocoder = new google.maps.Geocoder();
        /* initiating view objects used to switch */
        $scope.view = {
            name: ''
        };
        /* used for form values */
        $scope.userForm = {
            userId: '1',
            category: '1'
        };
        $scope.urlRest = '';
        $scope.forSale = true;
        $scope.bedrooms = '';
        $scope.bathrooms = '';
        $scope.reception = '';
        //activate();
        $scope.nextStep = function(step) {
            step = 'addDetails'
            switch (step) {
                case 'propAddress':
                    if ($scope.userForm.propertyType != null && $scope.userForm.category != null && $scope.userForm.userId != null) {
                        $scope.view.name = step;
                        $scope.placeChanged = function() {
                            vm.place = this.getPlace();
                            vm.map.setCenter(vm.place.geometry.location);
                        }
                        $timeout(function() {
                            NgMap.getMap().then(function(map) {
                                vm.map = map;
                                marker = new google.maps.Marker({
                                    position: map.getCenter(),
                                    map: vm.map
                                });
                                vm.map.panTo(map.getCenter());
                                geocodePosition(marker.getPosition());
                            });
                        }, 200);
                        var geocodePosition = function(pos) {
                            geocoder.geocode({
                                latLng: pos
                            }, function(responses) {
                                if (responses && responses.length > 0) {
                                    $timeout(function() {
                                        $scope.address = (responses[0].formatted_address);
                                        $scope.userForm.address = $scope.address;
                                        $scope.userForm.latitude = pos.lat();
                                        $scope.userForm.longitude = pos.lng();
                                    }, 200);
                                    //alert(pos.lng())
                                } else {
                                    $scope.address = ('Cannot determine address at this location.');
                                }
                            });
                        }
                    } else {
                        alert('Select type of property')
                    }
                    break;
                case 'addPhotos':
                    if ($scope.userForm.latitude != null && $scope.userForm.longitude != null) {
                        $scope.urlRest = 'http://52.42.99.192/Property/addPropertyStep1/';
                        httpService.getData($scope.urlRest, $scope.userForm).then(function(result) {
                            if (result.resCode == 0) {
                                $scope.view.name = step;
                                $mdToast.show($mdToast.simple().textContent(result.resStr).position('bottom right'));
                                // alert(result.resStr);
                                //$log.debug(result.response);
                                $scope.userForm.propertyId = result.response.propertyId;
                            } else {
                                $mdToast.show($mdToast.simple().textContent(result.resStr).position('bottom right'));
                                //alert(result.resStr);
                            }
                        });
                    }
                    break;
                case 'addDetails':
                    $scope.view.name = step;
                    //$scope.urlRest = 'http://52.42.99.192/Property/addPropertyStep1/';
                    break;
                case 'addDescription':
                    $scope.view.name = step;
                    $scope.urlRest = 'http://52.42.99.192/Property/savePropertyDescription/';
                    //$scope.userForm.propertyId = '18';
                    break;
                case 'setPrice':
                    if ($scope.userForm.description != null && $scope.userForm.description != '') {
                        //$log.debug($scope.userForm.description);
                        httpService.getData($scope.urlRest, $scope.userForm).then(function(result) {
                            if (result.resCode == 0) {
                                $scope.view.name = step;
                                $mdToast.show($mdToast.simple().textContent(result.resStr).position('bottom right'));
                                // alert(result.resStr);
                                $log.debug(result.response);
                            } else {
                                $mdToast.show($mdToast.simple().textContent(result.resStr).position('bottom right'));
                                //alert(result.resStr);
                            }
                        });
                    }
                    break;
                default:
                    $scope.view.name = 'default';
            }
        }

        $scope.updateRooms = function() {
            $scope.urlRest = 'http://52.42.99.192/Property/savePropertyRooms/';
            $scope.userForm.rooms = $scope.bedrooms, $scope.bathrooms, $scope.reception;
        }

        $scope.updateAmenities = function() {
            $scope.urlRest = 'http://52.42.99.192/Property/savePropertyAmenities/';
            $scope.userForm.amenities = '';
        }

        $scope.updateFeatures = function() {
            $scope.urlRest = 'http://52.42.99.192/Property/savePropertyFeatures/';
            $scope.userForm.features = '';
            $scope.userForm.visitingHours = '';
            $scope.userForm.visitingDays = '';
        }

        $scope.updateContact = function() {
            $scope.urlRest = 'http://52.42.99.192/Property/savePropertyContactNumber/';
            $scope.userForm.phone = '';
            $scope.userForm.countryCode = ''
        }

        $scope.updatePrice = function() {
            $scope.urlRest = 'http://52.42.99.192/Property/savePropertyPrice/';
            $scope.userForm.listedFor = '';
            $scope.userForm.price = '';
        }

        $scope.publishProp = function() {
                $scope.urlRest = 'http://52.42.99.192/Property/publishMyListing/';
            }
            //////////////
        function activate() {
            //$log.debug('Activating ' + vm.class);
        }

        // For select category and property type block 
        $scope.getBottmBorder = function(i, last) {
            if (($scope.propertiesTypeCount % 2 == 0 && last) || ($scope.propertiesTypeCount % 2 == 0 && ($scope.propertiesTypeCount - 2) == i)) return false;
            else if (($scope.propertiesTypeCount % 2 != 0 && last)) return false;
            else return true;
        }

        $scope.selectCategory = function(categoryId) {
            $scope.propCategory = categoryId;
            $scope.userForm.category = categoryId;
            $scope.propertyTypeList();
        }

        $scope.propertyTypeList = function() {
            $scope.urlRest = 'http://52.42.99.192/Property/getPropertyTypesForCategory/';
            var param = {
                "category": $scope.propCategory
            };
            $rootScope.myPromise = httpService.getData($scope.urlRest, param).then(function(result) {
                if (result.resCode == 0) {
                    $scope.propertiesTypeData = result.response;
                    $scope.propertiesTypeCount = result.response.length;
                }
            });
        }
        $scope.propertyTypeList();

        $scope.selectType = function(prop) {
            //alert(prop);
            $scope.userForm.propertyType = prop;
        }

        $scope.getImage = function(photos) {
                if (photos != "") {
                    var photosArr = photos.split(',');
                    return photosArr[0];
                }
            }

            // for property location block 
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                $scope.position = [position.coords.latitude, position.coords.longitude];
                $scope.positionStr = "[" + position.coords.latitude + "," + position.coords.longitude + "]"
            });
        }

        // For addPropertyDetails block
        $scope.slider = {
            value: 100,
            options: {
                floor: 1960,
                ceil: 2016,
                step: 10,
                showTicksValues: true,
                translate: function(value) {
                    return '<b></b> ' + value;
                }
            }
        };
        $scope.minMaxRangeSlider = {
            minValue: 40,
            maxValue: 60,
            options: {
                floor: 0,
                ceil: 100,
                step: 1,
                minRange: 10,
                maxRange: 50
            }
        };
        
        $scope.value4 = "1970";
        $scope.options = {
            from: 1960,
            to: 2015,
            step: 1,
            dimension: " $",
            scale: [1960, '|', 1970, '|', 1980, '|', 1990, '|', 2000, '|', 2015]
        };

        $scope.propertyDetailsList = function() {
            $scope.urlRest = 'http://52.42.99.192/Property/getAllParamsForAddPropertyForPropertyType/';
            var param = {
                "propertyType": "4"
            };
            $rootScope.myPromise = httpService.getData($scope.urlRest, param).then(function(result) {
                if (result.resCode == 0) {
                    $scope.roomTypeListData = result.response.room;
                    $scope.amenityListData = result.response.amenity;
                    $scope.featureListData = result.response.feature;
                    $scope.frontispicesList = ["North","South","East","West","North - West","North - East","South - East","South - West"];
                    $scope.daysList = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                }
            });
        }

        $scope.propertyDetailsList();
        $scope.clickedBtn = function($event) {
            //debugger;
            $(event.currentTarget).toggleClass('color2').toggleClass('color1');
        }
    }
})();