<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div id="menu">
    <table id="tabProfil" onclick="viewMenu()">
        <tr>
            <td id="tdUsername"><span>${utilisateur.name}</span></td>
            <td rowspan="2"><img src="${pageContext.request.contextPath}/data/img/avatar.jpg" /></td>
        </tr>
        <tr>
            <td id="tdEmail"><span>${utilisateur.email}</span></td>
        </tr>
    </table>
	<ul>
        <!-- profil -->
        
        <c:url value="/editUser" var="editURL"></c:url>
        <li id="menu_profil">Modifier votre profil</li>
        
        <form method="post" action='<c:out value="${editURL}"></c:out>' enctype="multipart/form-data">
            <li class="sub_menu profil_1"><input type="email" name="email" placeholder="email" value="${utilisateur.email}"/></li>
            <li class="sub_menu profil_2"><input type="password" name="motdepasse" placeholder="password" value="${utilisateur.motdepasse}"/></li>
            <input type="hidden" name="id" value="${utilisateur.id}"/>
            <input type="hidden" name="type" value="modifierProfil"/>
            <li class="sub_menu profil_3"><button>Modifier profil</button></li>
        </form>
        <!-- physique -->
		<li id="menu_physique">Modifier vos donn�es physique</li>
                
        <form method="post" action='<c:out value="${editURL}"></c:out>' enctype="multipart/form-data">
            <li class="sub_menu physique_1"><input type="date" name="naissance" placeholder="Non renseign�e" value="${utilisateur.naissance}"/></li>
            <li class="sub_menu physique_2"><input type="number" class="phy_taille" name="taille" placeholder="Non renseign�e" value="${utilisateur.taille}"/>cm</li>
            <li class="sub_menu physique_3"><input type="number" class="phy_poids" name="poids" placeholder="Non renseign�" value="${utilisateur.poids}"/>kg</li>
            <input type="hidden" name="id" value="${utilisateur.id}"/>
            <input type="hidden" name="type" value="modifierDonnees"/>
            <li class="sub_menu physique_4"><button>Modifier donn�es</button></li>
        </form>
        <!-- objectifs -->
		<li id="menu_objectif">Modifier vos objectifs</li>
                
        <form method="post" action='<c:out value="${editURL}"></c:out>' enctype="multipart/form-data">
            <li class="sub_menu ss_objectif_1_1">${utilisateur.objectif.titre}</li>
            <li class="sub_menu ss_objectif_1_2">${utilisateur.objectif.description}</li>
            <input type="hidden" name="id" value="${utilisateur.id}"/>
            <input type="hidden" name="type" value="modifierObjectif"/>
            <li class="sub_menu ss_objectif_1_3">
                <select name="objectif">
                  <c:forEach var="objectif" items="${objectifs}">
                    <option value="${objectif.id}" ${objectif.id == utilisateur.objectif.id ? 'selected="selected"' : ''}>${objectif.titre}</option>
                  </c:forEach>
                </select>
            </li>
            <li class="sub_menu ss_objectif_1_4"><button>Modifier objectif</button></li>
        </form>
	</ul>
        <c:url value="/deconnexion" var="deconnexion"></c:url>
        <a class="bt_deconnexion" href='<c:out value="${deconnexion}"></c:out>'>Deconnexion</a>
</div>