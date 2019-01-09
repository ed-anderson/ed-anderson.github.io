function addReagent()
{
    var markup = "<tr>" +
    "<td><input class='reagentName'></input></td>" +
    "<td><input class='reagentMass'></input></td>" +
    "<td><input type='checkbox' class='reactant'> Reactant</input></td>" +
    "<td><input type='checkbox' class='benign'> Benign</input></td>" +
    "</tr>";
    
    $("#reagentsTable tbody").append(markup);
}

function removeReagent()
{
    if (document.getElementById("reagentsTable").rows.length > 2)
    {
        document.getElementById("reagentsTable").deleteRow(-1);
    }
}

function getTableData()
{
    var reagents = [];
    var submitOK = true;

    $("#reagentsTable tr").each(function() {

        var reagentMass = $(this).find('.reagentMass').val();
        var reactant = $(this).find('.reactant').is(":checked");
        var benign = $(this).find('.benign').is(":checked");

        if (reagentMass != undefined)
        {
            if (isNaN(reagentMass))
            {
                alert("Reagent mass must be a number.")
                submitOK = false;
            }
            reagents.push({"reagentMass":reagentMass, "reactant":reactant, "benign":benign})
        }
    });

    if(submitOK == true)
    {
        return reagents;
    }
}

function getProductMass()
{
    var productMass = parseFloat(document.getElementById("productMass").value);

    if (isNaN(productMass))
    {
        alert("Product mass must be a number.");
        return false;
    }
    else
    {
        return productMass;
    }
}

function sumReagentMasses(reagents, reactionMassEfficiency, effectiveMassYield)
{
    var sumOfReagentMasses = parseFloat(0);


    if(reactionMassEfficiency == true)
    {
        var reagentsRME = reagents.filter(excludeNotReactant);

        for (i = 0; i < reagentsRME.length; i++)
        {
            sumOfReagentMasses += parseFloat(reagentsRME[i].reagentMass);
        }
    }

    else if(effectiveMassYield == true)
    {
        var reagentsEMY = reagents.filter(excludeBenign);

        for (i = 0; i < reagentsEMY.length; i++)
        {
            sumOfReagentMasses += parseFloat(reagentsEMY[i].reagentMass);
        }
    }

    else
    {
        for (i = 0; i < reagents.length; i++)
        {
            sumOfReagentMasses += parseFloat(reagents[i].reagentMass);
        }
    }

    return sumOfReagentMasses;
}

function excludeNotReactant(reagent)
{
    return reagent.reactant;
}

function excludeBenign(reagent)
{
    
    return !reagent.benign;
}

function getProcessMassIntensity(reagents, productMass)
{
    var sumOfReagentMasses = sumReagentMasses(reagents, false, false);

    return sumOfReagentMasses / productMass;
}

function getEFactor(reagents, productMass)
{
    var sumOfReagentMasses = sumReagentMasses(reagents, false, false);

    return (sumOfReagentMasses / productMass) - 1;
}

function getReactionMassEfficiency(reagents, productMass)
{
    var sumOfReagentMasses = sumReagentMasses(reagents, true, false);

    return (productMass / sumOfReagentMasses) * 100;
}

function getEffectiveMassYield(reagents, productMass)
{
    var sumOfReagentMasses = sumReagentMasses(reagents, false, true);

    return (productMass / sumOfReagentMasses) * 100;
}

function doCalculations()
{   
    showDiv(false);
    
    var reagents = getTableData();
    var productMass = getProductMass();

    if (!reagents || !productMass)
    {
        return;
    }

    var resultProcessMassIntensity = getProcessMassIntensity(reagents, productMass);
    document.getElementById("processMassIntensity").innerHTML = resultProcessMassIntensity;

    var resultEFactor = getEFactor(reagents, productMass);
    document.getElementById("eFactor").innerHTML = resultEFactor;    

    var resultReactionMassEfficiency = getReactionMassEfficiency(reagents, productMass);
    document.getElementById("reactionMassEfficiency").innerHTML = resultReactionMassEfficiency + " %";

    var resultEffectiveMassYield = getEffectiveMassYield(reagents, productMass);
    document.getElementById("effectiveMassYield").innerHTML = resultEffectiveMassYield + " %";

    showDiv(true);
}

function showDiv(show)
{
    var x = document.getElementById("results");

    if (show)
    {
        x.style.display = "block";
    }
    else
    {
        x.style.display = "none";
    }
}