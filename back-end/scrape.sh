p1=$(lynx --dump --listonly --nonumbers 'https://www.finn.no/realestate/homes/search.html?location=0.20003&location=1.20003.20043&page=1' | grep 'https://www.finn.no/realestate/homes/ad\|https://www.finn.no/realestate/newbuildinds')
p2=$(lynx --dump --listonly --nonumbers 'https://www.finn.no/realestate/homes/search.html?location=0.20003&location=1.20003.20043&page=2' | grep 'https://www.finn.no/realestate/homes/ad\|https://www.finn.no/realestate/newbuildinds')
p3=$(lynx --dump --listonly --nonumbers 'https://www.finn.no/realestate/homes/search.html?location=0.20003&location=1.20003.20043&page=3' | grep 'https://www.finn.no/realestate/homes/ad\|https://www.finn.no/realestate/newbuildinds')

links=$p1" "$p2" "$p3
path=https://www.finn.no/realestate/ownershiphistory.html?finnkode=

rm scrape.txt
for link in $links
do
  #Get full page for this property
  wget --output-document html.txt $link
  #Get the FINN-kode for this property, both output it and save is in variable
  finnCode=$(grep 'FINN-kode' html.txt | grep -o '".*"' | cut -f1 -d " " | tr -d '"' | sort -u)
  #Get the address of this property
  address=$(grep -E '<h2>.*, 14' html.txt | grep -o '>.*' | cut -f1 -d"<" | tr -d '>' | sort -u)
  #Get the firm selling this property
  firmA=$(grep 'element company-logo" alt="' html.txt | grep -o -P '(?<=alt=").*(?=">)' | sort -u)
  firmB=$(grep -Pzo '<img class="centered-element pvl company-logo"(.|\n)*>' html.txt | tr -d "\n\000 " | grep -o -P '(?<=alt=").*(?=">)' | cut -f1 -d">" | tr -d '"')
  #Get the SOLD value of the property
  sold=$(grep '<span class="objectstatus sold">' html.txt | grep -o -P '(?<=ld">).*(?=</spa)')
  #Get the Listing Price of the property
  price=$(grep -Pzo '<dd class="t2 mln mtn">(.|\n)*</dd>' html.txt | tr -d "\n\000" | grep -o '>.*' | cut -f1 -d"<" | tr -d '> ' | sed 's/[^0-9]*//g')
  #Get the name of the sellers
  sellersA=$(grep '<h3 class="name mbs">' html.txt | grep -o '>.*' | cut -f1 -d"<" | tr -d '>' | awk '!a[$0]++' | awk '{print $0"§"}')
  sellersB=$(grep -Pzo '<p class="mbs">(.|\n)*</p>' html.txt | tr -d "\n\000" | grep -o '>.*' | cut -f1 -d"<" | tr -d '>' | sed -e 's/^[[:space:]]*//' | awk '{print $0"§"}')
  #Get the full page for pricehistory of this page
  wget --output-document history.txt $path$finnCode
  #Get the old records for this property
  records=$(grep '<td' history.txt | grep -o -P '(?<=>).*(?=</td>)' | sed 's/[^0-9]*//g' | sed -r '/^.{,3}$/d')

  #Print to file
  echo $finnCode¤$address¤$sold¤$price¤$sellersA$sellersB¤$firmA$firmB¤$records >> scrape.txt
done
rm html.txt
rm history.txt
