@extends('layouts.app')

@section('content')

<div  class="container">
   
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div id="chatApp" class="panel panel-default" localHost={{asset ("/")}} user={{Auth::user()}} users={{$users}}>
                
            </div>
        </div>
    </div>
</div>
@endsection