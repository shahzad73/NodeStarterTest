var express = require('express');
var router = express.Router();

var Response_JSON = {};


/* GET users listing. */
router.get('/*', function(req, res, next) {
  console.log("lets begin");

  Response_JSON.Login = 1;
  next();
});




router.get('/GetPagesList', Users_GetPagesList);         //get static page list for user admin screen
router.get('/GetSiteMenu', Users_GetSiteMenu);
router.get('/CreateNewPage', Users_CreateNewPage);
router.get('/GetPage', Users_GetPage);
router.get('/UpdateStoreMenu', Users_UpdateStoreMenu);
router.get('/GetUserStorageLocations', Users_GetUserStorageLocations);              //these are the user storage location like AWS or google
router.get('/CreateNewUserStorageLocation', Users_CreateNewUserStorageLocation);
router.get('/GetAllOtherThanMasterPages', Users_GetAllOtherThanMasterPages);





function Users_GetAllOtherThanMasterPages(req, res, next)
{
    //get all other than master pages of the user
    //check st is numeric
    //dt = DBSpace.DBFunctionality.GetDataTable("Select * from Tempoli_StaticContentPages where StaticContentID = " + context.Request.Form["st" + RequestID].ToString() + " and PageTypeID != 1 ", context, "");
}




function Users_CreateNewUserStorageLocation(req, res, next)
{
    //this is where user will create a new storage location for the user in AWS or Google or user defined

}


function Users_GetUserStorageLocations(req, res, next)
{
    //get list of user storage locations like google location or AWS or thier own hosting location


}




function Users_UpdateStoreMenu(req, res, next)
{
    //check st is numeric

    //m is the menu in JSON string    check it does not contain any sql injection

    /*
    //check that website is being created then pages variable contains the page names to be created.
    if (context.Request.Form["pages"] != null)
    {
        string [] s = context.Request.Form["pages"].ToString().Split(',');
        for (int zz1 = 0; zz1 < s.Length; zz1++)
        {
            string[] con = s[zz1].ToString().Split('*');
            DBSpace.DBFunctionality.RunNonQuery("Insert INTO  Tempoli_StaticContentPages (PageName, PageFile, StaticContentID, PageTypeID) Values('" + con[0] + "','" + con[1] + "', " + context.Request.Form["st"].ToString() + ", " + con[2] + ")", context, "");
        }
    }

    string mnu = context.Request.Form["m"].ToString().Replace("*-", "\"");
    DBSpace.DBFunctionality.RunNonQuery("Update Tempoli_StaticContents Set SiteMenu = '" + mnu + "' Where id = " + context.Request.Form["st"].ToString(), context, "");
    return "{\"Login\":\"1\", \"Res\":\"ok\"}";

    */
}




function Users_GetPage(req, res, next)
{
    //check pag is numberic
    //DataRow dr = DBSpace.DBFunctionality.GetSingleRecordFromATable("Select PageFile, PageTypeID  from  Tempoli_StaticContentPages Where id = " + context.Request.Form["pag" + RequestID].ToString(), context, context.Session["UserDB"].ToString());
    //return {pn:dr["PageFile"].ToString(), pt:dr["PageTypeID"].ToString()};
}




function Users_CreateNewPage(req, res, next)
{
    //check   st     pt      number           st  is  static content id        pt is  pagetype

    //check that       Request.Form["st"].ToString()       static contents belongs to the currently logged in user
    //if (DBSpace.DBFunctionality.CheckRecordBelongToUser("Tempoli_StaticContents", "UserID", "ID", context.Request.Form["st"].ToString(), context.Session["UserID"].ToString(), context, "") == false)
    //{

    //replace space with _
    //NewFileName1 = context.Request.Form["nam"].ToString().Replace("%20", "_");    for page name
    //NewFileName2 = context.Request.Form["nam"].ToString().Replace("%20", " ");    for display name

    //StrOp = "Insert INTO  Tempoli_StaticContentPages (PageName, PageFile, StaticContentID, PageTypeID) Values('" + NewFileName2 + "','" + NewFileName1 + "', " + context.Request.Form["st"].ToString() + ", " + context.Request.Form["pt"].ToString() + ")";
    //DBSpace.DBFunctionality.RunNonQuery(StrOp, context, "");

    //return "{Res:"ok", pagid:NewFileName1, Login:1}";
}






function Users_GetSiteMenu(req, res, next)
{
    //DataRow dr = DBSpace.DBFunctionality.GetSingleRecordFromATable("Select SiteMenu, SiteCurrentLocation, SiteDirectoryInCurrentLocation, SiteCurrentLocationInterface from Tempoli_StaticContents where id = " + context.Request.Form["st" + RequestID].ToString(), context, "");
    //return {Login:1, Res:st, sl:dr["SiteCurrentLocation"].ToString(), sd:dr["SiteDirectoryInCurrentLocation"].ToString(), sinf:dr["SiteCurrentLocationInterface"].ToString()};
}




function Users_GetPagesList(req, res, next)
{

    if( req.query.DelRec )
     {

          if(text_validators.isNumeric(req.query.DelRec))
            {
                //DBSpace.DBFunctionality.RunNonQuery("Delete from  WebSitePages Where WebSitePageID = " + context.Request.Form["DelRec" + RequestID].ToString() + " and UserID = " + context.Session["UserID"].ToString(), context, "");
            }
          else
              console.log("not numeric");
    }


    commons.GetDataTable
    (
          "Select * from Tempoli_StaticContentPages",
          commons.GetTableSchema("Tempoli_StaticContentPages"),
          res,
          function(jsondata, res)
          {
              jj = commons.AppendJSONToAnother(Response_JSON, jsondata);
              res.json(jj);
          }
    );

}




module.exports = router;
