(function(){
/*
    앵귤러 모듈 선언
    C에서는 main() 함수가 프로그램의 시작 지점이지만,
    angular 에서는 특별한 시작 지점이 존재하지 않는다. 
    다만 여러개의 모듈들이 존재하고, ngApp에서 시작 지점으로 특정 모듈을
    지정하는 방식을 취한다.
    
    아래 모듈 선언에서는 설명을 위해 다소 파라메터들을 줄단위로 열거했다.
*/
    var app = angular.module
    (
        'myApp', //선언할 모듈명
        [], //선언하는 모듈에서 사용할 다른 모듈들(디펜던시). 예  'ngGrid'
        function(
            //여기에는 모듈 선언시에만 가져올 수 있는 프로바이더들을 파라메터로 넣어줄 수 있다.
            //예 : provide, $routeProvider, $compileProvider, $controllerProvider, $filterProvider
        ){
            //위에서 파라메터로 넣어준 프로바이더들 통해 여기에서 프로바이더로만 해줄 수 있는 로우레벨의 작업들을 할 수 있다. 예 : route 설정
        }
    );
    


    //--------------------------
    // 모델
    //--------------------------
    
    var model = [
            {
                "no" : 0,
                "id" : "NexusS",
                "name": "Nexus S",
                "snippet": "Fast just got faster with Nexus S."
            },
            {
                "no" : 1,
                "id" : "MotorolaXOOMWiFi",
                "name": "Motorola XOOM™ with Wi-Fi",
                "snippet": "The Next, Next Generation tablet."
            },
            {
                "no" : 2,
                "id" : "MotorolaXOOM",
                "name": "MOTOROLA XOOM™",
                "snippet": "The Next, Next Generation tablet."
            }
        ];

    /* $http 샘플 : 

    //파라메터로 보낼 임의의 데이터 객체
    var dataObject =
    {
        dataNo : $scope.dataNo + "",
        dataName : $scope.dataName,
        dataContent : $scope.dataContent
    };
     
     
    //AJAX 통신 처리
    $http({
        method: 'POST', //방식
        url: 'http://localhost/jsonURL', //통신할 URL
        data: dataObject, //파라메터로 보낼 데이터
        headers: {'Content-Type': 'application/json; charset=utf-8'} //헤더
    })
    .success(function(data, status, headers, config) {
        if( data ) {
            //성공적으로 결과 데이터가 넘어 왔을 때 처리
        }
        else {
            //통신한 URL에서 데이터가 넘어오지 않았을 때 처리
        }
    })
    .error(function(data, status, headers, config) {
        //서버와의 연결이 정상적이지 않을 때 처리
        console.log(status);
    });
    */

    //--------------------------
    // 컨트롤러
    //--------------------------
    
    //컨트롤러 선언. 컨트롤러는 여러개를 선언해줄 수 있다.
    app.controller
    (
        'myController', //선언할 컨트롤러명
        function($scope
            //여기에는 컨트롤러에서 사용할 서비스들을 파라메터로 넣어줄 수 있다.
            //예 : $scope, $rootScope, $location, $http ...
        ){
            //이 안에서 실제 여러가지 작업들을 하게 된다.
            
            $scope.test = "안녕하세요!";
            //console.log("$scope1 : ", $scope);
        }
    );

    // 백그라운드 통신을 위해 $http를 파라메터로 추가해준다.
    app.controller('PhoneListController', PhoneListController);
    function PhoneListController($scope, $http){
        
        $scope.orders = [
            {"value":"name", "label":"이름"}, 
            {"value":"snippet", "label":"설명"}, 
            {"value":"no", "label":"번호"}
        ];

        //기본값을 미리 번호로 정해주었다.
        //기본값을 정하지 않아도 되지만, 그럴경우 선언된 순서대로 표시된다.
        $scope.orderProperty = "name";

        //이렇게 선언된 배열 형태의 데이터 모델은 후에 NG-REPEAT에 의해 사용된다.
        $scope.phones = model;
        /*
        //jQuery의 ajax 통신과 거의 유사하다.
        $http.get('sample.json').success(function(data){
            $scope.phones = data;
        });
        */
    }

    // 폰 세부정보를 보여주는 컨트롤러
    app.controller('PhoneDetailController', PhoneDetailController);
    function PhoneDetailController($scope, $routeParams){
        
        $scope.phoneId = $routeParams.phoneId;

    }

    //--------------------------
    // 라우팅 : Access-Control-Allow-Origin
    // 웹서버 설치 후 테스트해 볼 수 있음
    // 서버설치 참고 (http://autoset.net/xe/)
    //--------------------------
    

    //경로(주소)에 따라 다른 뷰를 보여주도록 설정한다.
    //모듈의 첫번째 파라메터에는 ng-app의 이름을 설정하고,
    //$routeProvider를 가져와서 설정을 한다.
    app.config(['$routeProvider', function($routeProvider){

        $routeProvider.when(
            // 경로명
            '/phones', 
            {
                templateUrl: 'template/phone-list.html',
                controller: PhoneListController
            }
        ).when(
            '/phones/:phoneId', 
            {
                templateUrl: 'template/phone-detail.html',
                controller: PhoneDetailController
            }
        ).otherwise(
            {
                // 그외 모든 경로 이동
                redirectTo: '/phones'
            }
        );

    }]);




})();