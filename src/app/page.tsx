
 "use client";

import { useCallback } from "react";
import KlaviyoFeedEditor from "./components/KlaviyoFeedEditor";
import KeyValueEditor from "./components/KeyValueEditor";
export default function Home() {
   const copyCode = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      const code = `{% with columns=2 product_feed=feeds.myvidi|slice:":4" %}
<style type="text/css">
    .shop-button {
        background-color: #ff6b20; /* Bright orange */
        color: white;
        padding: 10px 24px;
        border: none;
        border-radius: 9999px; /* Fully rounded */
        font-weight: bold;
        text-transform: uppercase;
        font-size: 10px;
        cursor: pointer;
        margin-bottom: 50px;
        text-decoration: none;
        display: inline-block;
        box-shadow: 0 4px 0 #cc5200;
        transition: background-color 0.2s ease;
    }
    .shop-button:hover {
        background-color: #e65c00; /* Slightly darker orange */
    }
    .center-content {
        text-align: center;
    }
    .pricenew {
        font-weight: bold;
        text-transform: uppercase;
        font-size: 20px;
    }
    .original-price {
        color: #999; /* Light gray */
        text-decoration: line-through;
        font-weight: bold;
        opacity: 0.8;
        font-size: 15px;
    }
    .bottompadding {
        padding-bottom: 50px;
    }
    .product-column {
        width: 50% !important;
        vertical-align: top;
        padding: 10px;
    }
    .main-table {
        width: 100% !important;
        table-layout: fixed;
        margin: 0 auto;
        background-color: #fefdf8;
    }
</style>
<table class="main-table">
    <tbody>
        <tr>
            {% for variant in product_feed %}
            <td class="product-column">
                {% catalog variant.id integration="shopify" %}
                <table class="center-content" style="width: 100%;">
                    <tbody>
                        <tr>
                            <th>
                                <a href="{{ variant.url }}">
                                    <img alt="{{ catalog_item.title }}" src=" {{ catalog_item.variant.featured_image.full.src|default:catalog_item.featured_image.full.src }} " style="width: 200px; height: auto;" />
                                </a>
                            </th>
                        </tr>
                        <tr></tr>
                        <tr>
                            <td>
                                 <p class="pricenew" style="font-family: antique-olive, Tahoma, Verdana, Segoe, sans-serif; font-weight: bold; font-style: normal;">
                    
                    <span class="original-price">
                       {% if catalog_item.metadata|lookup:"$compare_at_price" and catalog_item.metadata|lookup:"$compare_at_price"|floatformat:2 != "0.00" %}
    {% currency_format catalog_item.metadata|lookup:"$compare_at_price"|floatformat:2 %}
{% elif catalog_item.metadata|lookup:"compare_at_price" and catalog_item.metadata|lookup:"compare_at_price"|floatformat:2 != "0.00" %}
    {% currency_format catalog_item.metadata|lookup:"compare_at_price"|floatformat:2 %}
{% endif %}
                    </span>
                      {% if catalog_item.metadata|lookup:"$price" %}
                          {% currency_format catalog_item.metadata|lookup:"$price"|floatformat:2 %}
                      {% elif catalog_item.metadata|lookup:"price" %}
                          {% currency_format catalog_item.metadata|lookup:"price"|floatformat:2 %}
                      {% endif %}
                      
                      
                      
                  </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p style="font-family: antique-olive, Tahoma, Verdana, Segoe, sans-serif; font-weight: bold; font-style: normal;"><a href="{{ catalog_item.url }}?variant={{ catalog_item.variant.id }}" class="shop-button">{{ feeds.cta|lookup:variant.id }} </a></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {% endcatalog %}
            </td>
            {% if forloop.counter|divisibleby:columns %}
        </tr>
        <tr>
            {% endif %} {% endfor %}
        </tr>
    </tbody>
</table>
{% endwith %}`;
      navigator.clipboard.writeText(code)
        .then(() => alert("Code copied to clipboard!"))
        .catch(() => alert("Failed to copy code"));
    }
  }, []);
  return (
    <div className="min-h-screen p-20 flex flex-col items-center gap-10 ">
      
            <h1 className="text-2xl  border-1 border-black p-2.5 font-light text-black font-[family-name:var(--font-geist-mono)]">Klaviyo Custom Product Feed 1 </h1>


      {/* Both feeds in one row */}
      <div className="flex flex-col lg:flex-row justify-center gap-10 w-full max-w-6xl">
        <KlaviyoFeedEditor />
        <KeyValueEditor />
      </div>

      <p className="mt-10 text-center text-sm text-red-600 font-[family-name:var(--font-geist-mono)]
              border border-red-600 rounded-md p-4 relative w-fit mx-auto bg-red-50">
  <span className="absolute -top-3 left-4 bg-red-50 px-2 text-sm font-semibold">Note:</span>
  When you preview a product on the Klaviyo template, feed updates may take a few minutes due to Git CDN caching.
</p>

  <div className="mt-10 w-full max-w-6xl mx-auto bg-gray-100 rounded-lg border border-gray-300 shadow p-4 relative">

        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-gray-700">Klaviyo Template HTML Code</span>
          

          <button
            onClick={copyCode}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Copy Code
          </button>
        </div>
        <pre className="text-xs text-gray-800 overflow-x-auto whitespace-pre-wrap break-all">
          <code>{`
 {% with columns=2 product_feed=feeds.myvidi|slice:":4" %}
<style type="text/css">
    .shop-button {
        background-color: #ff6b20; /* Bright orange */
        color: white;
        padding: 10px 24px;
        border: none;
        border-radius: 9999px; /* Fully rounded */
        font-weight: bold;
        text-transform: uppercase;
        font-size: 10px;
        cursor: pointer;
        margin-bottom: 50px;
        text-decoration: none;
        display: inline-block;
        box-shadow: 0 4px 0 #cc5200;
        transition: background-color 0.2s ease;
    }
    .shop-button:hover {
        background-color: #e65c00; /* Slightly darker orange */
    }
    .center-content {
        text-align: center;
    }
    .pricenew {
        font-weight: bold;
        text-transform: uppercase;
        font-size: 20px;
    }
    .original-price {
        color: #999; /* Light gray */
        text-decoration: line-through;
        font-weight: bold;
        opacity: 0.8;
        font-size: 15px;
    }
    .bottompadding {
        padding-bottom: 50px;
    }
    .product-column {
        width: 50% !important;
        vertical-align: top;
        padding: 10px;
    }
    .main-table {
        width: 100% !important;
        table-layout: fixed;
        margin: 0 auto;
        background-color: #fefdf8;
    }
</style>
<table class="main-table">
    <tbody>
        <tr>
            {% for variant in product_feed %}
            <td class="product-column">
                {% catalog variant.id integration="shopify" %}
                <table class="center-content" style="width: 100%;">
                    <tbody>
                        <tr>
                            <th>
                                <a href="{{ variant.url }}">
                                    <img alt="{{ catalog_item.title }}" src=" {{ catalog_item.variant.featured_image.full.src|default:catalog_item.featured_image.full.src }} " style="width: 200px; height: auto;" />
                                </a>
                            </th>
                        </tr>
                        <tr></tr>
                        <tr>
                            <td>
                                 <p class="pricenew" style="font-family: antique-olive, Tahoma, Verdana, Segoe, sans-serif; font-weight: bold; font-style: normal;">
                    
                    <span class="original-price">
                       {% if catalog_item.metadata|lookup:"$compare_at_price" and catalog_item.metadata|lookup:"$compare_at_price"|floatformat:2 != "0.00" %}
    {% currency_format catalog_item.metadata|lookup:"$compare_at_price"|floatformat:2 %}
{% elif catalog_item.metadata|lookup:"compare_at_price" and catalog_item.metadata|lookup:"compare_at_price"|floatformat:2 != "0.00" %}
    {% currency_format catalog_item.metadata|lookup:"compare_at_price"|floatformat:2 %}
{% endif %}
                    </span>
                      {% if catalog_item.metadata|lookup:"$price" %}
                          {% currency_format catalog_item.metadata|lookup:"$price"|floatformat:2 %}
                      {% elif catalog_item.metadata|lookup:"price" %}
                          {% currency_format catalog_item.metadata|lookup:"price"|floatformat:2 %}
                      {% endif %}
                      
                      
                      
                  </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p style="font-family: antique-olive, Tahoma, Verdana, Segoe, sans-serif; font-weight: bold; font-style: normal;"><a href="{{ catalog_item.url }}?variant={{ catalog_item.variant.id }}" class="shop-button">{{ feeds.cta|lookup:variant.id }} </a></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {% endcatalog %}
            </td>
            {% if forloop.counter|divisibleby:columns %}
        </tr>
        <tr>
            {% endif %} {% endfor %}
        </tr>
    </tbody>
</table>
{% endwith %}
`}

          </code>
        </pre>
      </div>
      <footer className="mt-10 text-center  text-sm text-gray-800 font-[family-name:var(--font-geist-mono)]">
        Custom App developed by Retrospec Tech team
      </footer>
    </div>
  );
}
