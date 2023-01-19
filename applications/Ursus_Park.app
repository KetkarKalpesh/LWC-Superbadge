<?xml version="1.0" encoding="UTF-8"?>
<CustomApplication xmlns="http://soap.sforce.com/2006/04/metadata">
    <actionOverrides>
        <actionName>Tab</actionName>
        <content>Home_Page_Default</content>
        <formFactor>Large</formFactor>
        <skipRecordTypeSelect>false</skipRecordTypeSelect>
        <type>Flexipage</type>
        <pageOrSobjectType>standard-home</pageOrSobjectType>
    </actionOverrides>
    <brand>
        <headerColor>#CC8A53</headerColor>
        <logo>ursusparkapplogo</logo>
        <logoVersion>1</logoVersion>
        <shouldOverrideOrgTheme>false</shouldOverrideOrgTheme>
    </brand>
    <description>Track your favorite bears in Ursus Park</description>
    <formFactors>Large</formFactors>
    <isNavAutoTempTabsDisabled>false</isNavAutoTempTabsDisabled>
    <isNavPersonalizationDisabled>false</isNavPersonalizationDisabled>
    <isNavTabPersistenceDisabled>false</isNavTabPersistenceDisabled>
    <label>Ursus Park</label>
    <navType>Standard</navType>
    <profileActionOverrides>
        <actionName>View</actionName>
        <content>Bear_Record_Page</content>
        <formFactor>Large</formFactor>
        <pageOrSobjectType>Bear__c</pageOrSobjectType>
        <type>Flexipage</type>
        <profile>Admin</profile>
    </profileActionOverrides>
    <profileActionOverrides>
        <actionName>View</actionName>
        <content>Bear_Record_Page</content>
        <formFactor>Large</formFactor>
        <pageOrSobjectType>Bear__c</pageOrSobjectType>
        <type>Flexipage</type>
        <profile>Standard</profile>
    </profileActionOverrides>
    <tabs>standard-home</tabs>
    <tabs>Bear__c</tabs>
    <tabs>standard-Contact</tabs>
    <tabs>standard-Feed</tabs>
    <uiType>Lightning</uiType>
    <utilityBar>Ursus_Park_UtilityBar</utilityBar>
</CustomApplication>
