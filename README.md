# expressfiltersortsearch
Project is in fact more complicated than it seems </br>

Rest API that lets you:
- filter data (like ?age[gt]=18&&age[lt]=30)
- sort data (like ?sort=-age,-cash) (minus for descending order)
- paginate (just add limit or page to qs)
- exclude/include fields (like ?fields=firstName,lastName,age)
- all of this combined

Moreover, there are two ways:
- Manual - in controller i did all of that manually (logic inside controller method)
- External, flexible class FluentAPI that lets you do this:
```js
new FluentAPI(User.find(filter), req.query)
                    .filter()
                    .sort()
                    .limitFields()
                    .paginate();
```
Moreover, there are nice touches in this project:
- catchAsync, if you dont know, learn that, its actually very simple (but the signatures need to match you always need async function that takes req, res, next)
- that fluentAPI i just mentioned but also good approach to filtering and parsing query string
- virtual methods in mongoose, small thing, but nice to know about
- param middleware... of course you can keep such logic inside controller or use express-validator to check, if given id exists for example, but param middleware is actually very nice.

Tbh doing backend in JS is so painful and frustrating im beginning to like that, but id prefer to do backends in PHP. JS is great for nice, reactive frontends, but backend... I dont get it (why people prefer JS to PHP/Python when it comes to backend) </br>
Still, if you want to do backend in node, you need to learn some tricks, here you install framework to a framework and then 1000 libraries to framework for your framework. there are no offical docs, guides, offical and recommended way of doing things. 
</br>
You must learn it yourself, learn the tricks and approaches to common problems, that in languages like PHP/Python and their frameworks are not even problems to begin with.
</br>
 So thats what im doing here, still its damn good project for a something done in few hours in language i barely know (when it comes to backend.). Of course i tried to replicate tricks and approaches i learned elsewhere, i always do so (just usually its official docs).
 </br> Anyways, have fun. I had coding it, looks like im beginning to understand basics of node backend.