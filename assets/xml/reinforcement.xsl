<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" xmlns:xlink="http://www.w3.org/1999/xlink">

  <xsl:param name="tokenselected"></xsl:param>

  <xsl:param name="abilityselected" select="abilities/abilitytoken[token=$tokenselected]/ability"></xsl:param>

  <xsl:template match="/">
    <html>
      <body id='replace'>
        <header>

          <div class="headerData">
            <div class='leftheader'>
              <img>
                <xsl:attribute name="class">reinforcementimage
                </xsl:attribute>
                <xsl:attribute name="src"><xsl:value-of select="abilities/reinforcement"/>
                </xsl:attribute>
              </img>
              <p class='overlaptextBig' style="top: 50px;   transform: translate(-30%);"><xsl:value-of select="abilities/abilitytoken[token=$tokenselected]/ability"/></p>
              <p class='overlaptextability' style="top: 130px;   transform: translate(-45%);">Reinforcement learning</p>


            </div>

            <div class='rightheader'>

              <xsl:for-each select="abilities/abilitytoken[token=$tokenselected]">
                <h3 class='type reinforcement' ><xsl:value-of select="ability"/></h3>
                <p class='descriptionAbility'>
                  <xsl:value-of select="description"/></p>
                  <p>
                    <span class='bold reinforcement'>Technical terms:
                    </span>
                    <span><xsl:value-of select="techterm"/></span>
                  </p>
                <div class='leftdiv'>
                <p>
                  <span class='bold reinforcement'>Abilities:
                  </span>
                  <ul>

                    <xsl:for-each select="capabilities/*">
                      <li><xsl:value-of select="@value"/></li>
                    </xsl:for-each>
                    <li>And much more...</li>
                  </ul>
                </p>
              </div>
              <div class='rightdiv'>
                <p>
                  <span class='bold reinforcement'>Limitations:
                  </span>
                  <ul>

                    <xsl:for-each select="limitations/*">
                      <li><xsl:value-of select="@value"/></li>
                    </xsl:for-each>
                    <li>ML is not perfect and will always make some errors</li>
                    <li>The output of the model can be different even with the same input</li>
                  </ul>
                </p>
              </div>
              </xsl:for-each>
            </div>

          </div>

        </header>

        <xsl:for-each select="abilities/abilitytoken[token=$tokenselected]">

          <!-- <header> <h2>ML ability: <xsl:value-of select="ability"/></h2> <p class='centerText'><xsl:value-of select="type"/></p> </header> -->
          <div class="centerBlock">
              <p>
              <span class='bold reinforcement'>Selection of pretrained models:
              </span>

            </p>
          </div>
        </xsl:for-each>
        <div>

          <table>
            <tr style="background-color:#78C8A5">
              <th>Example</th>
              <th>Description</th>
              <!-- <th>Link</th> -->
            </tr>

            <xsl:for-each select="abilities/records/record[ability=$abilityselected]">

              <xsl:sort select="data"/>
              <tr>
                <td>
                  <a href="{url/@xlink:href}" target="_blank">
                    <xsl:value-of select="mlmodel"/></a>
                </td>
                <td><xsl:value-of select="description"/></td>


              </tr>

            </xsl:for-each>
          </table>
        </div>
      </body>
      <footer></footer>
    </html>
  </xsl:template>

</xsl:stylesheet>