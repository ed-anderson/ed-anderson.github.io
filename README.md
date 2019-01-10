# ward3d.github.io (metricks-js)

Metricks is a free reaction metric calculator for synthetic chemical reactions. Currently, it can calculate Process Mass Intensity (PMI), E-Factor, Reaction Mass Efficiency (RME), and Effective Mass Yield (EMY) values from the same set of data.

## Getting Started

Input the names and masses of your reagents and product. Please make sure that you are using the same mass units for all of your reagents and your product. For accurate Reaction Mass Efficiency (RME) and Effective Mass Yield (EMY) calculations, please mark whether the reagent is a reactant (involved in the equation A + B + C -> D/is consumed), and/or whether it is benign.

If you need to add or remove rows from the Reagent Table, please use the "Add reagent" or "Delete reagent" buttons. 

If either your RME or EMY values are displayed as "Infinity %", please check that you have ticked the appropriate Reactant or Benign tickboxes. If they are still displaying as infinite, then congratulations! Your reactions are very efficient and/or effectively yielding!

This website uses Javascript to pull data from inputs held in a table, and perform calculations with this data based on what tickboxes are checked for each reagent. 

## Built With

* [Visual Studio Code](https://code.visualstudio.com/) - for code editing
* [W3 CSS](https://www.w3schools.com/w3css/w3css_templates.asp) - for style template

## Authors

Edward Anderson
