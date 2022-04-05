<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use LDAP\Result;
use SebastianBergmann\Environment\Console;

use function PHPUnit\Framework\isEmpty;


class ProductController extends Controller
{
    function addProduct(Request $req)
    {



        $validate = Validator::make(
            request()->all(),
            [
                'title' => 'required',
                'image' => 'required|image',
                'description' => '',
                'price' => 'required|numeric',
                'quantity' => 'numeric'

            ]
        );







        if ($validate->errors()->all() === []) {

            $img_path = $req['image']->store('produsts', 'public');
            $pro = Product::create(
                [
                    'title' => $req['title'],
                    'description' => $req['description'],
                    'price' => $req['price'],
                    'image' => $img_path,
                    'quantity' => $req['quantity']
                ]
            );


            return true;
        } else
            return $validate->errors()->all();
    }
    ////////////////////////////////////////////

    function list($offset)
    {
        $limit = 5;
        $all = Product::all()->count();
        if ($all < $offset + $limit) {

            $rest = $all - $offset;
            return DB::table('products')->skip($offset)->take($rest)->get();
        } else 
        if ($all <= $offset) {

            return null;
        } else {

            //to get the rest of data and limit getting data on each query 
            return DB::table('products')->skip($offset)->take($limit)->get();
        }
    }

    /////////////////////////////////////////////////////

    function delete(Request $req)
    {


        $product = Product::find($req->id);



        if (file_exists(public_path('storage/' . $product->image))) {

            Storage::delete('/public/' . $product->image);
        }

        $result =  Product::where("id", $req->id)->delete();

        if ($result) {

            return ['result' => 'success'];
        } else {

            return ['result' => 'something went wrong'];
        }
    }

    ////////////////////////////////////////////////

    function getProduct($id)
    {

        $result = Product::find($id);

        return $result;
    }

    ////////////////////////////////////////////////

    function update($id, Request $req)
    {
        $product = Product::findOrFail($id);

        $validate = Validator::make(
            request()->all(),
            [
                'title' => 'nullable',
                'image' => 'nullable|image',
                'description' => 'nullable',
                'price' => 'nullable|numeric',
                'quantity' => 'nullable|numeric'

            ]
        );

        if ($validate->errors()->all() === []) {

            $img_path = $product->image;

            if ($req->hasFile('image')) {

                $img_path = $req['image']->store('produsts', 'public');

                if (file_exists(public_path('storage/' . $product->image))) {

                    Storage::delete('/public/' . $product->image);
                }
            }

            $data = array_filter(request()->all());
            foreach ($data as $key => $item) {
                if ($data[$key] === "PUT")
                    unset($data[$key]);
            }

            $pro = Product::where('id', $id)->update(array_merge($data, ['image' => $img_path]));
            return ['done' => 'true'];
        } else {

            return $validate->errors()->all();
        }
    }
    ////////////////////////////////////////////////////

    function search($key, $offset)
    {
        $all = Product::where('title', 'Like', "%$key%")->count();
        
         $limit = 5;
         if ($all >= $offset + $limit) {

           
             return Product::where('title', 'Like', "%$key%")->skip($offset)->take($limit)->get();

         } else if ($all < $offset + $limit) {

             return Product::where('title', 'Like', "%$key%")->skip($offset)->take($all-$offset)->get();
         }
    }


    ///////////////////////////////////////////////////////////
}
//////////////////////////////////////////////
